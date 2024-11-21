import axios from "axios";
import type { WeatherData } from "../types/types";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: "metric"
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Weather API Error: ${error.response?.data.message || error.message}`);
    }
    throw error;
  }
};