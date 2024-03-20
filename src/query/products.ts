import { Product } from "@/types/Product";
import api from "./api";
import { usePaginatedQuery } from "./paginatedQuery";
import { Paginated, PaginationParams } from "@/types/Pagination";

// declaring keys as const helps with type inference for paginated queries
// as well as with refetching queries based on mutations
// (not used in this app, but any app that would normally send post/put requests needs to know when to refresh the data, which is best done through keys)
const keys = {
  products: () => ["products"] as const,
};

const useGetProducts = (
  params: Partial<PaginationParams> & { id?: number }
) => {
  return usePaginatedQuery({
    queryKey: [...keys.products()],
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey;
      const res = await api.get<Paginated<Product>>("products", { params });
      return res;
    },
    params,
  });
};

export { keys, useGetProducts };
