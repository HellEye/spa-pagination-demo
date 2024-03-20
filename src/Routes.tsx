import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { indexRoute } from "./App";

export const rootRoute = createRootRoute({
  // This is the wrapper for the entire application, rendered for every route
  // Good place to render a header/footer/sidebar
  // If there are pages that don't need the full layout, this would be different
  component: () => (
    <div className="h-[100vh] overflow-scroll bg-slate-200">
      <header className="w-full flex flex-row gap-8 bg-slate-300 p-4">
        <h1>Header</h1>
        <p>Some nav could go here</p>
      </header>
      <main className="mt-12 mx-40">
        {/* Outlet is where the page content will be rendered */}
        <Outlet />
      </main>
    </div>
  ),
});

const routeTree = rootRoute.addChildren([indexRoute]);
const router = createRouter({ routeTree });

// This provides path and search parameters type safety
// overriding a declared module makes it so we can import from react-router instead of from our own custom routes file
// and is the main official way to use this library
// There's also an option for file-based routing with code generation, which might be easier to manage for large-scale projects with many routes
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
/**
 * Component rendering all routes
 */
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
