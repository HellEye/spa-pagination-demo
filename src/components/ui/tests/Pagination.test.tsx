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

  it("should show one page when total pages is 1", async () => {
    const elem = render(<PaginationComponent page={1} totalPages={1} />, {
      wrapper: MockProviders,
    });
    await waitFor(() => expect(elem).toBeTruthy());
    expect(elem.getAllByRole("link")).toHaveLength(1);
  });
  it("should show correct links for large total pages", async () => {
    const elem = render(<PaginationComponent page={5} totalPages={10} />, {
      wrapper: MockProviders,
    });
    await waitFor(() => expect(elem).toBeTruthy());
    expect(elem.getAllByRole("link")).toHaveLength(5);
    const links = elem.getAllByRole("link");
    expect(links[0].innerHTML).toEqual("1");
    expect(links[1].innerHTML).toEqual("4");
    expect(links[2].innerHTML).toEqual("5");
    expect(links[3].innerHTML).toEqual("6");
    expect(links[4].innerHTML).toEqual("10");
  });
  it("should show correct links on first page", async () => {
    const elem = render(<PaginationComponent page={1} totalPages={10} />, {
      wrapper: MockProviders,
    });
    await waitFor(() => expect(elem).toBeTruthy());
    expect(elem.getAllByRole("link")).toHaveLength(3);
    const links = elem.getAllByRole("link");
    expect(links[0].innerHTML).toEqual("1");
    expect(links[1].innerHTML).toEqual("2");
    expect(links[2].innerHTML).toEqual("10");
  });
  it("should show correct links on last page", async () => {
    const elem = render(<PaginationComponent page={10} totalPages={10} />, {
      wrapper: MockProviders,
    });
    await waitFor(() => expect(elem).toBeTruthy());
    expect(elem.getAllByRole("link")).toHaveLength(3);
    const links = elem.getAllByRole("link");
    expect(links[0].innerHTML).toEqual("1");
    expect(links[1].innerHTML).toEqual("9");
    expect(links[2].innerHTML).toEqual("10");
  });
  it("should show correct links on second page", async () => {
    const elem = render(<PaginationComponent page={2} totalPages={10} />, {
      wrapper: MockProviders,
    });
    await waitFor(() => expect(elem).toBeTruthy());
    expect(elem.getAllByRole("link")).toHaveLength(4);
    const links = elem.getAllByRole("link");
    expect(links[0].innerHTML).toEqual("1");
    expect(links[1].innerHTML).toEqual("2");
    expect(links[2].innerHTML).toEqual("3");
    expect(links[3].innerHTML).toEqual("10");
  });
  it("should show correct links on second to last page", async () => {
    const elem = render(<PaginationComponent page={9} totalPages={10} />, {
      wrapper: MockProviders,
    });
    await waitFor(() => expect(elem).toBeTruthy());
    expect(elem.getAllByRole("link")).toHaveLength(4);
    const links = elem.getAllByRole("link");
    expect(links[0].innerHTML).toEqual("1");
    expect(links[1].innerHTML).toEqual("8");
    expect(links[2].innerHTML).toEqual("9");
    expect(links[3].innerHTML).toEqual("10");
  });
  it("should ");
});
