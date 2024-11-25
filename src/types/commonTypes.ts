export interface Country {
  phone: any;
  currency: string;
  native: string;
  emoji: string;
  code: string;
  name: string;
  capital: string;
  flag: string;
  languages: Array<{ name: string }>;
  continent: { name: string };
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
