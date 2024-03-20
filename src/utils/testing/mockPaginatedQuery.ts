import { Mock } from "vitest";
import { usePaginatedQuery } from "@/query/paginatedQuery";
import { Product } from "@/types/Product";
import { Paginated, PaginationParams } from "@/types/Pagination";
import { AxiosRequestConfig, AxiosResponse } from "axios";
export type QueryResponseMock = Mock<
  [url: string, config?: AxiosRequestConfig],
  Promise<AxiosResponse<Paginated<Product>>>
>;
export const useMockPaginatedQuery = (
  mock: QueryResponseMock,
  params?: PaginationParams & { id?: number }
) => {
  const res = usePaginatedQuery({
    queryKey: ["products"],
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;
      return await mock("/product", { params });
    },

    params: params,
    queryOptions: {
      retry: false,
    },
  });
  return res;
};
