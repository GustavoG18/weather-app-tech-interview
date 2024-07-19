import { CurrentWeatherResponse, TableInformation } from "@/interfaces/current-weather.interface";

/**
 * The main purpose of this function is to model the data returned by the "openweathermap" API 
 * from the current weather endpoint in such a way that it allows us to easily create a table.
 * @param {CurrentWeatherResponse} currentWeatherResponse - Data provided by the API.
 * @returns {TableInformation} - Data that is easy to shape into a table.
 */
export const parseCurrentWeatherResponse = ({ main, name, sys, weather }: CurrentWeatherResponse): TableInformation => {
    const tableInformation: Partial<TableInformation> = {};
    const translations: Record<string, string> = {
        temp: 'Temperature',
        temp_max: 'Maximum Temperature',
        temp_min: 'Minimum Temperature',
        feels_like: 'Feels Like',
        humidity: 'Humidity',
        pressure: 'Pressure',
    };

    tableInformation["dataTable"] = Object.keys(main).map((key) => {
        if (key in main) {
            return {
                key: translations[key] || key,
                value: main[key as keyof typeof main],
            };
        }
        return {
            key: key,
            value: '',
        };
    }).filter(({ key }) => key !== 'sea_level' && key !== 'grnd_level');

    tableInformation['title'] = `${name},${sys.country}`;
    tableInformation['description'] = weather[0].description;
    tableInformation['icon'] = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

    return tableInformation as TableInformation;
}