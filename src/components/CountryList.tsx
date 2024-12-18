import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../services/apollo";
import type { Country, SearchFilters } from "../types/commonTypes";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  searchQuery: string;
  filters: SearchFilters;
  onSelectCountry: (country: Country) => void;
  page: number;
  itemsPerPage: number;
}

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="space-y-2 text-center">
      <p className="text-lg font-medium text-red-500">Error loading countries</p>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="space-y-2 text-center">
      <p className="text-lg font-medium text-gray-600">No countries found</p>
      <p className="text-gray-500">Try adjusting your search or filters</p>
    </div>
  </div>
);

const InfoRow = ({ label, value, className = "" }: {
  label: string;
  value: string;
  className?: string;
}) => (
  <p className={`text-gray-600 ${className}`}>
    <span className="font-medium">{label}:</span>{" "}
    <span className="inline-block">{value}</span>
  </p>
);

const CountryCard = ({ country, onClick }: {
  country: Country;
  onClick: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const languagesText = country.languages.map(lang => lang.name).join(', ');
  const hasMultipleLanguages = country.languages.length > 1;
  
  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.expand-button')) {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    } else {
      onClick();
    }
  };
  return (
    <div
      onClick={handleClick}
      className="relative p-6 transition-all duration-300 bg-white border cursor-pointer rounded-xl hover:shadow-lg hover:border-gray-300 group"
    >
      <div className="flex flex-col items-center space-y-4">
        <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
          {country.emoji}
        </span>
        
        <div className="w-full space-y-3 text-center">
          <h2 className="text-xl font-bold text-gray-900 truncate">
            {country.name}
          </h2>
          
          <div className="space-y-2">
            <InfoRow label="Capital" value={country.capital} />
            <InfoRow label="Region" value={country.continent.name} />
            
            <div className="relative">
              <div className="pr-6">
                <InfoRow 
                  label="Languages" 
                  value={languagesText}
                  className={!isExpanded && hasMultipleLanguages ? 'line-clamp-1' : ''}
                />
              </div>
              
              {hasMultipleLanguages && (
                <button
                  className="absolute top-0 right-0 p-1 text-blue-600 transition-colors bg-white rounded expand-button hover:text-blue-800 hover:bg-gray-50"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? "Show less" : "Show more"}
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const useCountryFiltering = (
  countries: Country[], 
  searchQuery: string, 
  filters: SearchFilters,
  page: number,
  itemsPerPage: number
) => {
  if (!countries) return [];
  
  let filtered = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = !filters.region || country.continent.name === filters.region;
    return matchesSearch && matchesRegion;
  });

  if (filters.sortBy) {
    filtered = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }
  return filtered.slice(0, page * itemsPerPage);
};

export const CountryList = ({ searchQuery, filters, onSelectCountry, page, itemsPerPage }: Props) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  
  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div 
        role="status"
        className="w-12 h-12 border-b-2 border-gray-900 rounded-full animate-spin" 
      />
    </div>
  );
  
  if (error) return <ErrorState message={error.message} />;
  
  const visibleCountries = useCountryFiltering(data?.countries, searchQuery, filters, page, itemsPerPage);
  
  if (visibleCountries.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {visibleCountries.map(country => (
        <CountryCard
          key={country.code}
          country={country}
          onClick={() => onSelectCountry(country)}
        />
      ))}
    </div>
  );
};

export default CountryList;