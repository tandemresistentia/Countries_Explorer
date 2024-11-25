import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { client } from "./services/apollo";
import MainLayout from "./layouts/MainLayout";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <MainLayout />
        </ChakraProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}