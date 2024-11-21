import { ArrowLeft } from "lucide-react";
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
  
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const sortOptions = [
    { value: "name", label: "Name" },
  ] as const;

  const handleFilterChange = (newFilter: Partial<SearchFilters>) => {
    const updatedFilters = {
      ...filters,
      ...newFilter
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 p-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to List</span>
          </button>
        )}
        <input
          type="text"
          placeholder="Search countries..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <select
          aria-label="Filter by region"
          value={filters.region || ""}
          onChange={(e) => handleFilterChange({ region: e.target.value || undefined })}
          className="px-4 py-2 transition-colors bg-white border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All regions</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <select
          value={filters.sortBy || ""}
          onChange={(e) => handleFilterChange({ 
            sortBy: (e.target.value as SearchFilters["sortBy"]) || undefined 
          })}
          className="px-4 py-2 transition-colors bg-white border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sort by</option>
          {sortOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

      </div>
    </div>
  );
};

export default SearchBar;