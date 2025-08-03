import { AxiosInstance, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

const promise = <T>(callback: (axios: AxiosInstance) => Promise<AxiosResponse<T>>): App.Services.Response<T> => {
  return new Promise((resolve, reject) => {
    try {
      return callback(axiosInstance)
      .then((res) => resolve(res.data as App.Services.BaseDataResponse<T>));
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
      .then((res) => resolve(res.data as App.Services.BasePaginatedResponse<T>));
    } catch (e) {
      console.log(e);
      reject({ success: false, error: e });
    }
  });
}

export { promise, promisePaginated };