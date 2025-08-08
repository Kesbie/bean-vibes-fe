import axios, { InternalAxiosRequestConfig } from "axios";
import appConfigs from "@/configs";
import { localStorageService } from "./storages";
import { refreshToken as authRefreshToken } from "./auth";
import qs from "qs";

// Utility function to check if current path is admin route
const isAdminRoute = () => {
  console.log(window.location.pathname)
  return typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
};

const refreshToken = async () => {
  console.log('Starting token refresh...');
  const refreshToken = localStorageService.load('refreshToken');

  if (!refreshToken) {
    console.log('No refresh token found');
    localStorageService.delete('accessToken');
    localStorageService.delete('refreshToken');
    localStorageService.delete('user');
    
    // Check if current path is admin route
    if (isAdminRoute()) {
      window.location.href = '/login';
    }
    return false;
  }

  try {
    console.log('Calling auth refresh token service...');
    const response = await authRefreshToken({ refreshToken });
    console.log('Auth refresh response:', response);
    
    if (response.code === 200 && response.data) {
      localStorageService.save('accessToken', response.data.access.token);
      localStorageService.save('refreshToken', response.data.refresh.token);
      console.log('Token refresh successful');
      return true;
    }
    
    console.log('Token refresh failed - invalid response code:', response.code);
    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    localStorageService.delete('accessToken');
    localStorageService.delete('refreshToken');
    localStorageService.delete('user');
    
    // Check if current path is admin route
    if (isAdminRoute()) {
      window.location.href = '/login';
    }
    return false;
  }
}

const axiosInstance = axios.create({
  baseURL: appConfigs.api.url,
  timeout: 60_000,
  validateStatus: (status) => status >= 200 && status < 600,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  }
})

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorageService.load('accessToken');

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('Axios interceptor error:', error.response?.status, error.config?.url);
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Attempting token refresh...');
      originalRequest._retry = true;
      const refreshSuccess = await refreshToken();
      
      if (refreshSuccess) {
        console.log('Token refresh successful, retrying request');
        const newAccessToken = localStorageService.load('accessToken');
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } else {
        console.log('Token refresh failed');
      }
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;