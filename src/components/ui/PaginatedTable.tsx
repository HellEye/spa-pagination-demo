import { PaginationQueryResult } from "@/query/paginatedQuery";
import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./table";
import { Base } from "@/types/Base";
import { Skeleton } from "./skeleton";
import Pagination from "./Pagination";

type Props<T extends Base> = {
  pagination: PaginationQueryResult<T>;
  header: string[];
  // Normally I pass in a "render" function as a prop, or an object with definitions of columns and render functions for each element
  // however this time I decided to try this api, it's been used in some styling libraries, as well as old react context (before hooks)
  // The danger with separate header and row render function is that the header might not match the actual column types,
  // but it's a lot less verbose than defining column objects
  // As always I'm happy to discuss my solution and the alternatives
  children: (row: T) => React.ReactNode;
};

const PaginatedTable = <T extends Base>({
  pagination,
  header,
  children,
}: Props<T>) => {
  const { data, isLoading, error } = pagination.query;
  if (isLoading)
    return (
      <div className="flex flex-row gap-2 w-full">
        <Skeleton className="w-full" />
        {/* This could be done dynamically based on the number of columns, if they're avaliable in pagination (ex a value like limit or per_page) */}
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
      </div>
    );
  if (error) {
    return (
      <div className="flex flex-row gap-2 w-full">
        <p className="w-full text-xl">Error loading data</p>
        <p className="w-full text-xl">{error.message}</p>
      </div>
    );
  }
  if (!data || !data.data || data.data.length === 0 || data.total === 0)
    return (
      <div className="flex flex-row gap-2 w-full">
        <p className="w-full text-xl">No results</p>
      </div>
    );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {header.map((headerItem) => (
              <TableHead role="columnheader" key={headerItem}>
                {headerItem}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{data?.data.map(children)}</TableBody>
      </Table>
      <Pagination
        page={pagination.params.page}
        totalPages={data?.total_pages}
        className="mt-4"
      />
    </>
  );
};

export default PaginatedTable;
