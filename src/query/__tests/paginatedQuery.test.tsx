import { cleanup, renderHook, waitFor } from "@testing-library/react";

import { mockAxiosError, mockAxiosOk, mocks } from "@/utils/testing/mockAxios";
import { useMockPaginatedQuery } from "@/utils/testing/mockPaginatedQuery";
import { MockProviders, queryClient } from "@/utils/testing/MockProviders";

describe("usePaginatedQuery", () => {
  afterEach(() => {
    vi.resetAllMocks();
    queryClient.clear();
    cleanup();
  });

  it("should return a paginated query result", async () => {
    const { result } = renderHook(() => useMockPaginatedQuery(mockAxiosOk()), {
      wrapper: MockProviders,
    });

    await waitFor(() => expect(result.current.query.isFetched).toBe(true));
    expect(result.current.query.data).toEqual(mocks.getAll());
    expect(result.current.query.error).toBeNull();
  });

  it("should return the right page", async () => {
    const { result } = renderHook(
      () => useMockPaginatedQuery(mockAxiosOk(), { page: 2 }),
      {
        wrapper: MockProviders,
      }
    );
    await waitFor(() => expect(result.current.query.isFetched).toBe(true));

    expect(result.current.query.data).toEqual(mocks.getAll(2));
  });

  it("should set error if query fails", async () => {
    const { result } = renderHook(
      () => useMockPaginatedQuery(mockAxiosError(404)),
      {
        wrapper: MockProviders,
      }
    );
    await waitFor(() => expect(result.current.query.isError).toBe(true));
    expect(result.current.query.data).toBeUndefined();
    expect(result.current.query.error).toEqual({
      status: 404,
      data: { message: "Not Found" },
    });
  });
});
