import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Task from "./screens/task";

function App() {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: 6 * 60 * 60,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Task />
    </QueryClientProvider>
  );
}

export default App;
