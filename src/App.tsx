import { createRoute, useNavigate } from "@tanstack/react-router";
import z from "zod";
import PaginatedTable from "./components/ui/PaginatedTable";
import { TableCell, TableRow } from "./components/ui/table";
import { query } from "./query";
import { rootRoute } from "./Routes";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useState } from "react";
import { Product } from "./types/Product";
import ProductDialog from "./components/Product/ProductDialog";

const AppIndex = () => {
  // Tanstack Router provides type safe url parameters thanks to the schema and validateSearch function
  const params = indexRoute.useSearch();
  //     ^?

  // using custom paginatedQuery hook to fetch, and cache data
  // type of params is defined inside the specific query as PaginationParams & <other parameters>

  const pagination = query.products.useGetProducts(params);

  // used for syncing state with url search params
  const navigate = useNavigate({ from: "/" });

  // Used for modal
  const [selected, setSelected] = useState<Product>();
  return (
    <div>
      <div className="flex flex-row gap-4 items-center">
        <Label htmlFor="idInput">Search by ID</Label>
        <Input
          id="idInput"
          className="w-60"
          onChange={(e) => {
            const id = parseInt(e.target.value);
            navigate({
              search: (prev) => ({
                ...prev,
                id: isNaN(id) ? undefined : id,
              }),
            });
          }}
          value={params.id ?? ""}
        />
      </div>
      <PaginatedTable pagination={pagination} header={["ID", "Name", "Year"]}>
        {/* Defining how to render a row for a specific product */}
        {(product) => (
          <TableRow
            key={product.id}
            style={{ backgroundColor: product.color }}
            className="cursor-pointer hover:outline-2 outline-0 outline-slate-600"
            onClick={() => {
              setSelected(product);
            }}
          >
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.year}</TableCell>
          </TableRow>
        )}
      </PaginatedTable>
      <ProductDialog
        product={selected}
        onClose={() => setSelected(undefined)}
      />
    </div>
  );
};

// Zod provides validation of url parameters, as well as type safety with TypeScript
// It's optional for validating params.
// Most router libraries like react-router don't even have the option, which is why I chose tanstack router

const paramsSchema = z.object({
  id: z.number().min(1).optional(),
  page: z.number().min(1).optional().catch(1),
});

// This can be done through file-based rendering option in react-router, with exporting just the path options object
// It can also be made in a separate file that imports the AppIndex component,
// but I believe it's good to keep the path information next to the component itself, this way I can tell this component is a page,
// and not a general component
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: AppIndex,
  // This takes a function, which can be manually written, but also takes in a specific object that many validation libraries provide
  validateSearch: paramsSchema,
  // This takes in a component that will be rendered if the validation fails
  notFoundComponent: () => <div>Not found</div>,
});

export default AppIndex;
export { indexRoute };
