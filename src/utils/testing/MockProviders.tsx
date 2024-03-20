import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
const router = (children: React.ReactNode) => {
  const tree = createRootRoute({
    component: () => <Outlet />,
  });
  tree.addChildren([
    createRoute({
      getParentRoute: () => tree,
      path: "/",
      component: () => <div>{children}</div>,
    }),
  ]);
  return createRouter({
    routeTree: tree,
  });
};
// Weird children passing due to how testing-library works
// renderHook mounts the hook as a child, but tanstack router doesn't take children as props
export const queryClient = new QueryClient();
export const MockProviders = ({ children }: { children: React.ReactNode }) => {
  const r = router(children);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={r} />
    </QueryClientProvider>
  );
};
