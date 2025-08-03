import { MutationFunction, useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { message } from "antd";

export type UseCustomMutationConfigs<T> = {
  mutationFn: MutationFunction<App.Services.BaseDataResponse<T>, unknown>;
  onSuccess?: (res: T) => void;
  onError?: (error: unknown) => void;
  messageConfigs?: {
    successMessage?: string;
    errorMessage?: string;
  };
}

export type UseCustomPaginatedQueryConfigs<T> = UseQueryOptions<App.Services.PaginatedData<T>> & {
  api?: App.Services.PaginatedResponse<T>;
}

const useCustomPaginatedQuery = <T>(configs: UseCustomPaginatedQueryConfigs<T>) => {
  const { queryKey, queryFn, enabled, api, ...restConfigs } = configs;

  const queryFnCustom = queryFn ? queryFn : () => api.then((res) => res.data);

  const query = useQuery({ queryKey, queryFn: queryFnCustom, enabled, ...restConfigs });
  return query;
};

const useCustomMutation = <T>(configs: UseCustomMutationConfigs<T>) => {
  const { mutationFn, messageConfigs, onSuccess, onError } = configs;
  const { successMessage = 'Thành công', errorMessage = 'Có lỗi xảy ra' } = messageConfigs || {};

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (res) => {
      if (res.data || !res) {
        message.success(successMessage);
        onSuccess?.(res.data);
      } else {
        message.error(res.message || errorMessage);
        onError?.(res.message);
      }
    },
  });

  return mutation;
};

export { useCustomMutation, useCustomPaginatedQuery };