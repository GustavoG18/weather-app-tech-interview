import { useState, useEffect } from "react";
import { AirQualityResponse } from "@/interfaces/air-polution.interface";
import { FiveDayForecastResponse } from "@/interfaces/precipitation-temperature.interface";
import { parseCurrentWeatherResponse } from "@/dtos/current-weather.dto";
import { CurrentWeatherResponse } from "@/interfaces/current-weather.interface";
import { useLocation } from "./use-location";
import { parseChartResponse } from "@/dtos/chart-data.dto";

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const appId = import.meta.env.VITE_WEATHER_APPID;

export enum WeatherService {
  FiveDayForecast = "forecast",
  AirPollution = "air_pollution/history",
  CurrentWeather = "weather",
}

type Params = Partial<{
  startDate: string;
  endDate: string;
}>;

export const useWeather = <T>(serviceName: WeatherService, params?: Params) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { location, error: errorLocation } = useLocation();

  useEffect(() => {
    const getData = async () => {
      setError("");
      try {
        setLoading(true);
        const endpoint = getEndpoint();
        const response = await fetch(endpoint);
        if (response.ok) {
          const weatherData = await response.json();
          const parsedData = handleWeatherServiceResponse(weatherData);
          setData(parsedData as T);
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching the graph data");
      } finally {
        setLoading(false);
      }
    };
    if(location.lat && location.long){
      getData();
    }
  }, [location]);

  useEffect(() => {
    setError(errorLocation);
  }, [errorLocation])

  /**
  * This function models the data in a way that Recharts understands, 
  * or allows us to easily create a two-column table.
  * @param {AirQualityResponse | FiveDayForecastResponse | CurrentWeatherResponse} weatherData - Data provided by the "openweathermap" API.
  * @returns {TableInformation | ChartData[]} - Returns the data already modeled to create a chart or table, depending on the chosen service.
  */
  const handleWeatherServiceResponse = (weatherData: AirQualityResponse | FiveDayForecastResponse | CurrentWeatherResponse) => {
    switch (serviceName) {
      case WeatherService.AirPollution:
        return parseChartResponse(weatherData as AirQualityResponse);
      case WeatherService.FiveDayForecast:
        return parseChartResponse(weatherData as FiveDayForecastResponse);
      case WeatherService.CurrentWeather:
        return parseCurrentWeatherResponse(weatherData as CurrentWeatherResponse);
    }
  };

  /**
  * This function creates the endpoint with the necessary parameters for each service name.
  * @returns {string} - Returns a string with the necessary endpoint URL based on the used service name.
  */
  const getEndpoint = () => {
    const baseEndpoint = `${BASE_URL}/${serviceName}?lat=${location?.lat}&lon=${location?.long}&appid=${appId}&units=metric`;
    let additionalParams = '';
    switch (serviceName) {
      case WeatherService.AirPollution:
        additionalParams = `&start=${params?.startDate}&end=${params?.endDate}`;
        break;
    }
    return `${baseEndpoint}${additionalParams}`;
  };

  return { data, loading, error };
};
