export interface Country {
  code: string;
  name: string;
  capital: string;
  region: string;
  area: number;
  population: number;
  flag: string;
  languages: Array<{ name: string }>;
  currency: string;
  timezones: string[];
  [key: string]: any; 
}
export interface SearchFilters {
  region?: string;
  sortBy?: 'name' | 'nameDesc';
}

export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}
