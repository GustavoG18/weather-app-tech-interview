import moment from "moment";
import { FiveDayForecastResponse } from "@/interfaces/precipitation-temperature.interface";
import { ChartData } from "@/interfaces/chart.interface";

type PrecipitationEntry = { precipitation: number[], temperature: number[] }

export const parsePrecipitationTemperatureResponse = ({ list }: FiveDayForecastResponse): ChartData[] => {
    const groupedData: Record<string, PrecipitationEntry> = {};

    list.forEach(({ dt, pop, main }) => {
        const date = moment.unix(dt).format('DD');
        if (!groupedData[date]) {
            groupedData[date] = { precipitation: [], temperature: [] };
        }
        groupedData[date].precipitation.push(pop);
        groupedData[date].temperature.push(main.temp);
    });

    return Object.entries(groupedData).map(([date, { precipitation, temperature }]) => {
        const averagePrecipitation = precipitation.reduce((sum, val) => sum + val, 0) / precipitation.length;
        const averageTemperature = temperature.reduce((sum, val) => sum + val, 0) / temperature.length;

        return {
            date,
            precipitation: averagePrecipitation * 100,
            temperature: averageTemperature,
        };
    });
}
