import WeatherDisplay from "./WeatherDisplay";
import type { Country } from "../types/commonTypes";
import { ArrowLeft } from "lucide-react";

interface Props {
  country: Country;
  onBack: () => void;
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="mb-1 text-sm font-medium text-gray-500">
      {label}
    </span>
    <span className="text-base text-gray-900">
      {value}
    </span>
  </div>
);

export const CountryDetail = ({ country, onBack }: Props) => {
  return (
    <div className="w-full min-w-full mx-auto rounded-lg shadow-lg">
      <div className="p-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-gray-600 transition-colors hover:text-gray-900 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to list</span>
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center p-8 rounded-lg">
              <span className="transition-transform text-7xl animate-pulse hover:scale-110">
                {country.emoji}
              </span>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="flex flex-col space-y-6">
              <div className="pb-4 border-b">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  {country.name}
                </h1>
                <p className="text-lg text-gray-600">
                  {country.native}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <InfoItem label="Capital" value={country.capital} />
                  <InfoItem label="Region" value={country.continent.name} />
                  <InfoItem 
                    label="Languages" 
                    value={country.languages.map(lang => lang.name).join(", ")} 
                  />
                </div>

                <div className="space-y-4">
                  <InfoItem label="Currency" value={country.currency} />
                  <InfoItem label="Phone" value={`+${country.phone}`} />
                </div>
              </div>

              {country.capital && (
                <div className="pt-4 mt-4 border-t">
                  <WeatherDisplay city={country.capital} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;