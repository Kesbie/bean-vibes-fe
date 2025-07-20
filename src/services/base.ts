import axios, { type Axios } from "axios";
import { decodeJwt } from 'jose'

import appConfigs from "@/configs";
import { LocalStorage } from "./storages";

class BaseService implements App.Services.BaseService {
  axios: Axios;

  accessToken?: string
  refreshToken?: string

  localStorage: LocalStorage;

  constructor() {
    this.localStorage = new LocalStorage();

    this.axios = axios.create({
      baseURL: appConfigs.api.url, 
      timeout: 10_000,
      validateStatus: (status) => status >= 200 && status < 600,
    });

    this.axios.interceptors.request.use(async (config) => {
      if (!this.accessToken) {
        this.accessToken = this.localStorage.load('accessToken');
        this.refreshToken = this.localStorage.load('refreshToken');
      }

      if (this.isTokenExpired(this.accessToken)) {
        await this.refresh();
      }

      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }

      return config;
    });
  }

  isTokenExpired = (token?: string): boolean => {
    if (!token) return true

    const decoded = decodeJwt(token);

    if (!decoded.exp) return true

    const now = Date.now() / 1000

    return decoded.exp < now;
  }

  refresh = async () => {
    try {
      const result = await this.axios.post('/auth/refresh', {
        refreshToken: this.refreshToken,
      });

      if (result.status === 200) {
        this.accessToken = result.data.accessToken;
        this.localStorage.save('accessToken', this.accessToken);
      }

      return this.accessToken;
    } catch (error) {
      console.log('refresh error', error)
      return undefined
    }
  }
}

export default BaseService;