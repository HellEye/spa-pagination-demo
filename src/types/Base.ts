/**
 * This type is the base type for all fetched resources
 *
 * I believe all resources fetched from an api should have a form of id
 * This also makes it easier to render a paginated output (react wants a key parameter, id is always the best option for that)
 *
 * If by any chance the resource would not have an id,
 * this can be made to be overriden in the paginated query/table type definition to allow for adding id based on another value (eg. name)
 */
export type Base = {
  id: number;
};

export type MaybePromise<T> = T | Promise<T>;
