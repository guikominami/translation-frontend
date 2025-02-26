import Languages from "./components/Languages";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Languages />
      </QueryClientProvider>
    </>
  );
}

export default App;
