import { cleanup, render, waitFor } from "@testing-library/react";
import PaginationComponent from "../Pagination";
import { MockProviders } from "@/utils/testing/MockProviders";

describe("Pagination", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });
  afterAll(() => {
    cleanup();
  });

  it("should render", async () => {
    const elem = render(<PaginationComponent page={0} />, {
      wrapper: MockProviders,
    });
    expect(elem).toBeTruthy();
  });

  it("should show disabled links when total pages is 1", async () => {
    const elem = render(<PaginationComponent page={1} totalPages={1} />, {
      wrapper: MockProviders,
    });
    await waitFor(() => expect(elem).toBeTruthy());
    const links = elem.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0].ariaDisabled).toBe("true");
    expect(links[1].ariaDisabled).toBe("true");
  });
  it("should have only next link enabled if on first page", async () => {
    const elem = render(<PaginationComponent page={1} totalPages={2} />, {
      wrapper: MockProviders,
    });
    await waitFor(() => expect(elem).toBeTruthy());
    const links = elem.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0].ariaDisabled).toBe("true");
    expect(links[1].ariaDisabled).toBeNull();
  });

  it("should have only previous link enabled if on last page", async () => {
    const elem = render(<PaginationComponent page={2} totalPages={2} />, {
      wrapper: MockProviders,
    });
    await waitFor(() => expect(elem).toBeTruthy());
    const links = elem.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0].ariaDisabled).toBeNull();
    expect(links[1].ariaDisabled).toBe("true");
  });
  it("should have both links enabled if on a middle page", async () => {
    const elem = render(<PaginationComponent page={2} totalPages={3} />, {
      wrapper: MockProviders,
    });
    await waitFor(() => expect(elem).toBeTruthy());
    const links = elem.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0].ariaDisabled).toBeNull();
    expect(links[1].ariaDisabled).toBeNull();
  });
});
