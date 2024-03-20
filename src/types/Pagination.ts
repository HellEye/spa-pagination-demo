import { Base } from "./Base";

/**
 * Parameters used for unified pagination (every paginated page should have similar api parameters)
 *
 */
export type PaginationParams = {
  page: number;
};

export type Paginated<T extends Base = Base> = {
  data: T[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  // Adding for completeness, not used in this project
  support?: {
    url: string;
    text: string;
  };
};

export type ApiPaginated<T extends Base = Base> = Paginated<T> & {
  data: T | T[];
};
