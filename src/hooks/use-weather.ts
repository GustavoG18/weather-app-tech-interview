import { useState, useEffect } from "react";

export enum WeatherService {
  FiveDayForecast = "forecast",
  AirPollution = "air_pollution",
  CurrentWeather = "weather",
}

const FAKE_LAT = "10.992960";
const FAKE_LONG = "-74.779907";

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const appId = import.meta.env.VITE_WEATHER_APPID;

export const useWeather = (serviceName: WeatherService) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const endpoint = `${BASE_URL}/${serviceName}?lat=${FAKE_LAT}&lon=${FAKE_LONG}&appid=${appId}`;
        const response = await fetch(endpoint);
        console.log("response", response);
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

  return { data, loading, error };
};
