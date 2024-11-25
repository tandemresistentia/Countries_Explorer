import { useState, useRef, useEffect } from "react";
import type { Country, SearchFilters } from "../types/commonTypes";
import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import { CountryList } from "../components/CountryList";
import { CountryDetail } from "../components/CountryDetail";

const ITEMS_PER_PAGE = 20;

export default function MainLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        setPage(prev => prev + 1);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-6xl min-h-screen bg-gray-50">
      <div className="px-4 pt-4 mx-auto max-w-7xl">
        <div className="min-w-[70em] w-full px-4 mx-auto sm:px-6 lg:px-8">
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
            <div ref={containerRef} className="mt-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <CountryList
                searchQuery={debouncedSearch}
                filters={filters}
                onSelectCountry={setSelectedCountry}
                page={page}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}