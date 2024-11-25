
import { Country } from "../../src/types/commonTypes";
import { vi } from 'vitest';

export const mockCountries: Country[] = [
  {
    code: "US",
    name: "United States",
    capital: "Washington, D.C.",
    emoji: "🇺🇸",
    continent: { name: "North America", code: "NA" },
    languages: [{ name: "English" }],
    currency: "USD",
    phone: "1",
    native: "United States",
    flag: "https://restcountries.eu/data/usa.svg",
  },
  {
    code: "FR",
    name: "France",
    capital: "Paris",
    emoji: "🇫🇷",
    continent: { name: "Europe", code: "EU" },
    languages: [{ name: "French" }],
    currency: "EUR",
    phone: "33",
    native: "France",
    flag: "https://restcountries.eu/data/fra.svg",
  }
];
  
  export const mockWeatherData = {
    main: {
      temp: 20,
      humidity: 65
    },
    weather: [{
      description: "Sunny",
      icon: "01d"
    }]
  };
  
  // Mock Apollo Client
  export const mockApolloClient = {
    query: vi.fn().mockResolvedValue({ data: { countries: mockCountries } })
  };