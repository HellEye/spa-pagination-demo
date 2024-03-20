import api from "@/query/api";
import { Paginated } from "@/types/Pagination";
import { Product } from "@/types/Product";
import { AxiosError, AxiosResponse } from "axios";
import { vi } from "vitest";
export const mocks = {
  getAll: (page: number = 1): Paginated<Product> => ({
    page,
    per_page: 6,
    total: 2,
    total_pages: 1,
    data: [
      {
        id: 1,
        name: "Product 1",
        year: "2020",
        color: "red",
        pantone_value: "1",
      },
      {
        id: 2,
        name: "Product 2",
        year: "2021",
        color: "blue",
        pantone_value: "2",
      },
    ],
  }),
  getEmpty: (): Paginated<Product> => ({
    page: 1,
    per_page: 6,
    total: 0,
    total_pages: 1,
    data: [],
  }),
};

export const mockAxiosOk = () =>
  vi.fn(api.get).mockImplementation((_url, config) => {
    return Promise.resolve({
      data: mocks.getAll(config?.params?.page),
    } as AxiosResponse<Paginated<Product>>);
  });

export const mockAxiosEmpty = () =>
  vi
    .fn(api.get)
    .mockImplementation(() =>
      Promise.resolve({ data: mocks.getEmpty() } as AxiosResponse<
        Paginated<Product>
      >)
    );

export const mockAxiosError = (
  status: number = 404,
  message: string = "Not Found"
) =>
  vi.fn(api.get).mockImplementation(() =>
    Promise.reject({ status, data: { message } } as unknown as AxiosError<{
      message: string;
    }>)
  );
