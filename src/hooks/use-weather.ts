import { useState, useEffect } from "react";
import { parseAirPolutionResponse } from "@/dtos/air-polution.dto";
import { parsePrecipitationTemperatureResponse } from "@/dtos/precipitation-temperature.dto";
import { ChartData } from "@/interfaces/chart.interface";
import { AirQualityResponse } from "@/interfaces/air-polution.interface";
import { FiveDayForecastResponse } from "@/interfaces/precipitation-temperature.interface";
import { parseCurrentWeatherResponse } from "@/dtos/current-weather.dto";
import { CurrentWeatherResponse, DataTable } from "@/interfaces/current-weather.interface";

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
  lat: string;
  long: string;
}>;

export const useWeather = (serviceName: WeatherService, params?: Params) => {
  const [data, setData] = useState<ChartData[] | DataTable[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const endpoint = getEndpoint();
        const response = await fetch(endpoint);
        if (response.ok) {
          const weatherData = await response.json();
          handleWeatherServiceResponse(serviceName, weatherData);
        }
      } catch (err) {
        setError("Error fetching the graph data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleWeatherServiceResponse = (serviceName: WeatherService, weatherData: AirQualityResponse | FiveDayForecastResponse | CurrentWeatherResponse) => {
    switch (serviceName) {
      case WeatherService.AirPollution:
        setData(parseAirPolutionResponse(weatherData as AirQualityResponse));
        break;
      case WeatherService.FiveDayForecast:
        setData(parsePrecipitationTemperatureResponse(weatherData as FiveDayForecastResponse));
        break;
      case WeatherService.CurrentWeather:
        setData(parseCurrentWeatherResponse(weatherData as CurrentWeatherResponse));
        break;
    }
  };


  const getEndpoint = () => {
    const baseEndpoint = `${BASE_URL}/${serviceName}?lat=${params?.lat}&lon=${params?.long}&appid=${appId}&units=metric`;
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
