import { useState } from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { client } from "./services/apollo";
import SearchBar from "./components/SearchBar";
import { CountryList } from "./components/CountryList";
import { CountryDetail } from "./components/CountryDetail";
import { useDebounce } from "./hooks/useDebounce";
import type { Country, SearchFilters } from "./types/types";

const queryClient = new QueryClient();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <div className="min-h-screen bg-gray-50">
            <div className="px-4 py-8 mx-auto max-w-7xl">
              <div className="min-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <SearchBar
                  onSearch={setSearchQuery}
                  onFilterChange={setFilters}
                />
                {selectedCountry ? (
                  <div className="mt-6">
                    <CountryDetail 
                      country={selectedCountry} 
                      onBack={() => setSelectedCountry(null)} 
                    />
                  </div>
                ) : (
                  <div className="mt-6">
                    <CountryList
                      searchQuery={debouncedSearch}
                      filters={filters}
                      onSelectCountry={setSelectedCountry}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </ChakraProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;