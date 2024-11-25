import { ArrowLeft, Search, SortAsc, Globe } from "lucide-react";
import { useState } from "react";
import type { SearchFilters } from "../types/types";

type Props = {
  onSearch: (query: string) => void;
  onFilterChange: (filters: SearchFilters) => void;
  showBackButton?: boolean;
  onBack?: () => void;
};

const SearchBar = ({ onSearch, onFilterChange, showBackButton = false, onBack }: Props) => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [query, setQuery] = useState("");
  
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "nameDesc", label: "Name (Z-A)" },
  ] as const;

  const handleFilterChange = (newFilter: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilter };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleSearch("");
    }
  };

  return (
    <div className="w-full p-4 space-y-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 p-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Back to list"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
        )}
        <div className="relative flex-1">
          <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <input
            type="search"
            value={query}
            placeholder="Search countries..."
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full py-2 pl-10 pr-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search countries"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <select
            id="region"
            value={filters.region || ""}
            onChange={(e) => handleFilterChange({ region: e.target.value || undefined })}
            className="pl-2 pr-8 py-1.5 bg-white border border-gray-200 rounded-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4 text-gray-500" />
          <select
            id="sort"
            value={filters.sortBy || ""}
            onChange={(e) => handleFilterChange({ 
              sortBy: (e.target.value as SearchFilters["sortBy"]) || undefined 
            })}
            className="pl-2 pr-8 py-1.5 bg-white border border-gray-200 rounded-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Sort by</option>
            {sortOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;