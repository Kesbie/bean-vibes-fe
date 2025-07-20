declare namespace App.Services {
  export interface BaseService {
    axios: Axios;
    accessToken?: string | null;
    refreshToken?: string | null;
    localStorage: LocalStorage;
  }

  export interface Response<T> {
    code: number;
    data?: T;
    message: string;
  }
}