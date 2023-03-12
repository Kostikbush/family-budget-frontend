export type QueryResult<TData, TError> = {
  data?: TData;
  error?: TError;
  isLoading: boolean;
  isLoaded: boolean;
  isStale: boolean;
  isError: boolean;
};
