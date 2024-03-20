import { ApiPaginated, Paginated, PaginationParams } from "@/types/Pagination";
import {
  QueryFunctionContext,
  QueryKey,
  QueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { useDebouncedValue } from "../utils/useDebouncedState";
import { AxiosError, AxiosResponse } from "axios";
import { Base } from "@/types/Base";
import { MaybePromise } from "../types/Base";

export type UsePaginatedQueryOptions<
  TData extends Base,
  TKey extends QueryKey,
  TParams
> = {
  queryKey: TKey;
  queryFn: (
    ctx: QueryFunctionContext<[...TKey, TParams & PaginationParams]>
  ) =>
    | MaybePromise<AxiosResponse<Paginated<TData>>>
    | MaybePromise<AxiosResponse<ApiPaginated<TData>>>;
  params?: TParams & Partial<PaginationParams>;
  defaultParams?: TParams & Partial<PaginationParams>;
  delay?: number;
  queryOptions?: QueryOptions<
    Paginated<TData>,
    AxiosError,
    Paginated<TData>,
    [...TKey, TParams & PaginationParams]
  >;
};

export const usePaginatedQuery = <
  TData extends Base,
  TParams,
  const TKey extends QueryKey
>({
  queryKey,
  queryFn,
  params,
  delay = 500,
  defaultParams,
  queryOptions,
}: UsePaginatedQueryOptions<TData, TKey, TParams>) => {
  // debouncing parameters here to prevent unnecessary api calls
  // For react query, it would be beneficial to have a "leading edge" debounce to display data immediately from cache if that's available
  // but I've implemented a falling edge one because it's easier
  // If the state wasn't taken from the url, I would have used a reducer/state (see useDebouncedState) with some type safe setter functions
  const debouncedParams = useDebouncedValue<TParams & PaginationParams>(
    {
      ...defaultParams,
      page: 1,
      ...params,
    } as TParams & PaginationParams,
    delay
  );
  const query = useQuery<
    Paginated<TData>,
    AxiosError,
    Paginated<TData>,
    [...TKey, TParams & PaginationParams]
  >({
    ...queryOptions,
    // Injecting params into the query key lets us use parameters in the function via the context, just like with normal react query
    queryKey: [...queryKey, debouncedParams],
    queryFn: async (ctx) => {
      const res = await queryFn(ctx);
      // I'm force converting response data to an array to make pagination easier.
      // Normally paginated endpoints tend to return an array even with one or zero results
      // (unless the endpoint is specifically for one resource, eg. /products/1),
      // but this api is different
      if (Array.isArray(res.data.data)) return res.data;
      return {
        ...res.data,
        data: [res.data.data],
      } as Paginated<TData>;
    },
  });

  return {
    query,
    params: {
      page: params?.page ?? defaultParams?.page ?? 1,
    } as PaginationParams,
    search: params as TParams,
  };
};

export type PaginationQueryResult<
  TData extends Base = Base,
  TParams = Record<string, unknown>,
  TKey extends QueryKey = QueryKey
> = ReturnType<typeof usePaginatedQuery<TData, TParams, TKey>>;
