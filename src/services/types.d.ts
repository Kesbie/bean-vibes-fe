declare namespace App.Services {

  export type PaginatedFilters = {
    page?: number;
    limit?: number;
  }

  export interface BaseService {
    axios: Axios;
    accessToken?: string | null;
    refreshToken?: string | null;
    localStorage: LocalStorage;
  }

  export type PaginatedData<T> = {
    results: T[];
    totalResults: number;
    totalPages: number;
    page: number;
    limit: number;
  }


  export type BasePaginatedResponse<T> = {
    code: number;
    data?: PaginatedData<T>;
    message: string;
  }

  export type BaseDataResponse<T> = {
    code: number;
    data?: T;
    message: string;
  }

  export type Response<T> = Promise<BaseDataResponse<T>>;

  export type PaginatedResponse<T> = Promise<BasePaginatedResponse<T>>;
}