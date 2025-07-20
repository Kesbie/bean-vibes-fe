import axios, { Axios } from "axios";
import appConfigs from "@/configs";

class AuthService {
  #END_POINT = '/auth'

  axios: Axios;

  constructor() {
    this.axios = axios.create({
      baseURL: appConfigs.api.url, 
      timeout: 10_000,
      validateStatus: (status) => status >= 200 && status < 600,
    });
  }

  login: App.Services.AuthService.Login = async (payload) => {
    try {
      const response = await this.axios.post(`${this.#END_POINT}/login`, payload);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  refreshToken: App.Services.AuthService.RefreshToken = async (payload) => {
    try {
      const response = await this.axios.post(`${this.#END_POINT}/refresh-token`, payload);
      return response.data;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;  
    }
  }

  register: App.Services.AuthService.Register = async (payload) => {
    try {
      const response = await this.axios.post(`${this.#END_POINT}/register`, payload);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  logout: App.Services.AuthService.Logout = async () => {
    try {
      const response = await this.axios.post(`${this.#END_POINT}/logout`);
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  verifyEmail: App.Services.AuthService.VerifyEmail = async (token: string) => {
    try {
      const response = await this.axios.post(`${this.#END_POINT}/verify-email`, { token });
      return response.data;
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  }

  sendVerifyEmail: App.Services.AuthService.SendVerifyEmail = async () => {
    try {
      const response = await this.axios.post(`${this.#END_POINT}/send-verify-email`);
      return response.data;
    } catch (error) {
      console.error('Send email verification error:', error);
      throw error;
    }
  }
}

export default AuthService;