import axiosInstance from "../axiosInstance";
import { promise } from "../promise";


const END_POINT = '/auth'

const login: App.Services.AuthService.login = (payload: App.Services.AuthService.LoginCredentials) => {
  return promise((axios) => axios.post(`${END_POINT}/login`, payload))
}

const register: App.Services.AuthService.register = (payload: App.Services.AuthService.RegisterCredentials) => {
  return promise((axios) => axios.post(`${END_POINT}/register`, payload))
}

const refreshToken: App.Services.AuthService.refreshToken = (payload: App.Services.AuthService.RefreshTokenPayload) => {
  return promise((axios) => axios.post(`${END_POINT}/refresh-tokens`, payload))
}

const logout: App.Services.AuthService.logout = () => {
  return promise((axios) => axios.post(`${END_POINT}/logout`))
}


const verifyEmail: App.Services.AuthService.verifyEmail = (token: string) => {

  return new Promise((resolve, reject) => {
    axiosInstance.post(`${END_POINT}/verify-email`, { token }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err) 
    })
  })
}

const sendVerifyEmail: App.Services.AuthService.sendVerifyEmail = () => {
  return new Promise((resolve, reject) => {
    axiosInstance.post(`${END_POINT}/send-verify-email`).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })  
  })
}

export { login, register, refreshToken, logout, verifyEmail, sendVerifyEmail }