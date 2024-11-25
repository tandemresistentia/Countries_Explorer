import { Box, Text, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../services/weatherApi";
import { WeatherData } from "../types/commonTypes";

interface Props {
  city: string;
}

const WeatherDisplay = ({ city }: Props) => {
  const { data, isLoading, error } = useQuery<WeatherData>({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city)
  });
  if (isLoading) return <Spinner data-testid="loading-spinner"/>;
  if (error) return <Text>Weather data unavailable</Text>;
  if (!data) return null;

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold">Weather in {city}</Text>
      <Text>Temperature: {data.main.temp}°C</Text>
      <Text>Conditions: {data.weather[0].description}</Text>
      <img
        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        alt={data.weather[0].description}
      />
    </Box>
  );
};

export default WeatherDisplay;