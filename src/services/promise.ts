import { AxiosInstance, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

const promise = <T>(callback: (axios: AxiosInstance) => Promise<AxiosResponse<T>>): App.Services.Response<T> => {
  return new Promise((resolve, reject) => {
    try {
      return callback(axiosInstance)
        .then((res) => {
          // Kiểm tra status code từ response
          if (res.status >= 200 && res.status < 300) {
            resolve(res.data as App.Services.BaseDataResponse<T>);
          } else {
            // Nếu status code không thành công, reject với error
            reject({ 
              success: false, 
              error: res.data,
              status: res.status 
            });
          }
        })
        .catch((error) => {
          console.log('Promise error:', error);
          reject({ success: false, error: error.response?.data || error });
        });
    } catch (e) {
      console.log(e);
      reject({ success: false, error: e });
    }
  });
}

const promisePaginated = <T>(callback: (axios: AxiosInstance) => Promise<AxiosResponse<T>>): App.Services.PaginatedResponse<T> => {
  return new Promise((resolve, reject) => {
    try {
      return callback(axiosInstance)
        .then((res) => {
          // Kiểm tra status code từ response
          if (res.status >= 200 && res.status < 300) {
            resolve(res.data as App.Services.BasePaginatedResponse<T>);
          } else {
            // Nếu status code không thành công, reject với error
            reject({ 
              success: false, 
              error: res.data,
              status: res.status 
            });
          }
        })
        .catch((error) => {
          console.log('PromisePaginated error:', error);
          reject({ success: false, error: error.response?.data || error });
        });
    } catch (e) {
      console.log(e);
      reject({ success: false, error: e });
    }
  });
}

export { promise, promisePaginated };