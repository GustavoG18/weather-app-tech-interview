import { useState, useEffect } from "react";

export enum WeatherService {
  FiveDayForecast = "forecast",
  AirPollution = "air_pollution/history",
  CurrentWeather = "weather",
}

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const appId = import.meta.env.VITE_WEATHER_APPID;

type Params = Partial<{
  startDate: string;
  endDate: string;
  lat: string;
  long: string;
}>;

export const useWeather = (serviceName: WeatherService, params?: Params) => {
  const [data, setData] = useState();
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
          setData(weatherData);
        }
      } catch (err) {
        setError("Error fetching the graph data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const getEndpoint = () => {
    const baseEndpoint = `${BASE_URL}/${serviceName}?lat=${params?.lat}&lon=${params?.long}&appid=${appId}`;
    let additionalParams;
    switch (serviceName) {
      case WeatherService.AirPollution:
        additionalParams = `&start=${params?.startDate}&end=${params?.endDate}`;
        break;
    }
    return `${baseEndpoint}${additionalParams}`;
  };

  return { data, loading, error };
};
