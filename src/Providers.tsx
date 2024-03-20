import React from "react";

type Props = {
  children: React.ReactNode;
};
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query client
// Used to fetch data, but also functions as global context provider for already fetched and cached data
// Thanks to this, many tools for global data store are not necessary (Assuming handling url parameters is done outside of redux as well,
// which is simplified by tanstack-router, but react-router or next.js also have this capability, just without full type safety)
// This example didn't use any, but for some things that would need to be global in a full application (ex. user auth)
// I often use zustand, which is a global state management library, that's less complex, more lightweight, and easier to work with than redux
// There are mixed opinions online about redux/mobx/other full state management library vs react query with something lightweight
// I'd be happy to discuss this more
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: false,
    },
  },
});
const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
