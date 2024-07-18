import moment from "moment";
import { FiveDayForecastResponse } from "@/interfaces/precipitation-temperature.interface";
import { ChartData } from "@/interfaces/chart.interface";

export const parsePrecipitationTemperatureResponse = ({ list }: FiveDayForecastResponse): ChartData[] => {
    return list.map(({ dt, pop, main }) => {
        const date = moment.unix(dt).format('DD-MMM-YYYY');
        return {
            date,
            precipitation: pop,
            temperature: main.temp,
        }
    });
}