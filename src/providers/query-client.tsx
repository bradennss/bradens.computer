"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { memo, PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = memo<PropsWithChildren>(({ children }) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
});
QueryClientProvider.displayName = "QueryClientProvider";

export default QueryClientProvider;
