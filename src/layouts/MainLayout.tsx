import { useState } from "react";
import type { Country, SearchFilters } from "../types/types";
import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import { CountryList } from "../components/CountryList";
import { CountryDetail } from "../components/CountryDetail";

export default function MainLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  return (
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
  );
}