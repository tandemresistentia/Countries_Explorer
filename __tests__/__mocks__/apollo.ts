
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
    states: [],
    region: "Americas",
    area: 9833517,
    population: 331002651,
    flag: "https://restcountries.eu/data/usa.svg",
    timezones: ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00"]
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
    states: [],
    region: "Europe",
    area: 551695,
    population: 67391582,
    flag: "https://restcountries.eu/data/fra.svg",
    timezones: ["UTC+01:00"]
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