import {
  cleanup,
  render,
  renderHook,
  waitFor,
  screen,
} from "@testing-library/react";
import PaginatedTable from "../PaginatedTable";
import { useMockPaginatedQuery } from "@/utils/testing/mockPaginatedQuery";
import {
  mockAxiosEmpty,
  mockAxiosError,
  mockAxiosOk,
} from "@/utils/testing/mockAxios";
import { TableCell, TableRow } from "../table";
import { MockProviders, queryClient } from "@/utils/testing/MockProviders";
import { PaginationQueryResult } from "@/query/paginatedQuery";
import { Product } from "@/types/Product";
import { TestAPI } from "vitest";
import Providers from "@/Providers";
const TestComponent = ({
  pagination,
}: {
  pagination: PaginationQueryResult<Product>;
}) => {
  return (
    <PaginatedTable
      pagination={pagination}
      header={["ID", "Name"]}
      children={(elem) => (
        <TableRow key={elem.id}>
          <TableCell>{elem.id}</TableCell>
          <TableCell>{elem.name}</TableCell>
        </TableRow>
      )}
    />
  );
};

const testWithRender: TestAPI<{ elem: ReturnType<typeof render> }> = it.extend({
  elem: async ({ expect }, use) => {
    const { result } = renderHook(() => useMockPaginatedQuery(mockAxiosOk()), {
      wrapper: Providers,
    });
    await waitFor(async () => expect(result.current).toBeTruthy());

    const elem = render(<TestComponent pagination={result.current} />, {
      wrapper: MockProviders,
    });
    await waitFor(async () => expect(elem.baseElement).toBeTruthy());
    use(elem);
  },
});

describe("PaginatedTable", () => {
  afterEach(() => {
    // vi.restoreAllMocks();
    vi.resetAllMocks();
    queryClient.clear();
    cleanup();
  });
  afterAll(() => {
    cleanup();
  });

  testWithRender("should render", async ({ elem }) => {
    expect(elem.baseElement).toBeTruthy();
  });
  testWithRender("should have the correct number of rows", async ({ elem }) => {
    // 2 rows + header
    expect(elem.getAllByRole("row")).toHaveLength(3);
  });
  testWithRender(
    "should have the correct number of columns",
    async ({ elem }) => {
      expect(
        elem.getAllByRole("columnheader", {
          hidden: true,
        })
      ).toHaveLength(2);
    }
  );
  it("should show no results", async () => {
    const { result } = renderHook(
      () => useMockPaginatedQuery(mockAxiosEmpty()),
      {
        wrapper: MockProviders,
      }
    );
    await waitFor(() => expect(result.current.query.isFetched).toBe(true));

    render(<TestComponent pagination={result.current} />, {
      wrapper: MockProviders,
    });

    await waitFor(async () =>
      expect(screen.getByText("No results")).toBeTruthy()
    );
  });
  it("should show error message", async () => {
    const { result } = renderHook(
      () => useMockPaginatedQuery(mockAxiosError(404, "Error message")),
      {
        wrapper: Providers,
      }
    );
    waitFor(() => {
      return result.current?.query.isError;
    });
    const elem = render(<TestComponent pagination={result.current} />, {
      wrapper: MockProviders,
    });
    waitFor(async () => expect(elem.baseElement).toBeTruthy());
    expect(elem.findByText("Error message")).toBeTruthy();
  });
});
