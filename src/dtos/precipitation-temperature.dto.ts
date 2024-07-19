import moment from "moment";
import { FiveDayForecastResponse, WeatherEntry } from "@/interfaces/precipitation-temperature.interface";
import { ChartData } from "@/interfaces/chart.interface";

export type PrecipitationEntry = { precipitation: number, temperature: number }

/**
 * The main purpose of this function is to model the forecast 5 days data from OpenWeather 
 * into a format that can be graphed with Recharts library.
 * This function first calls the `groupedByDate` function to organize the data for each day into a single object attribute.
 * Then, it calculates the average of each temperature and precipitation measurement attribute for the same day.
 * As a result, it returns a date with the average of each attribute for that date, ready for Recharts to understand and graph.
 * 
 * @param {AirQualityResponse} airPolutionResponse - The raw response from OpenWeather's forecast 5 days data.
 * @returns {ChartData[]} - An array of objects ready for Recharts to understand and graph.
 */
export const parsePrecipitationTemperatureResponse = ({ list }: FiveDayForecastResponse): ChartData[] => {
    return Object.entries(groupedByDate(list)).map(([date, precipitationEntryArray]) => {
        const numEntries = precipitationEntryArray.length;

        const avgComponents = precipitationEntryArray.reduce((acc: Partial<PrecipitationEntry>, precipitationEntryValues: PrecipitationEntry) => {
            (Object.keys(precipitationEntryValues) as (keyof PrecipitationEntry)[]).forEach(key => {
                if (!acc[key]) {
                    acc[key] = 0;
                }
                acc[key]! += precipitationEntryValues[key];
            });
            return acc;
        }, {} as Partial<PrecipitationEntry>);

        (Object.keys(avgComponents) as (keyof PrecipitationEntry)[]).forEach(key => {
            avgComponents[key]! /= numEntries;
        });

        return {
            date,
            ...avgComponents,
        } as ChartData;
    });
}

/**
 * The "openweathermap" API at its forecast 5 days endpoint returns multiple measurements for the same day, 
 * making the graph very heavy if the date range is extensive.
 * This function groups all measurements of the same day into a single attribute of an object,
 * so that another function can later calculate the average for that day.
 * 
 * @param {WeatherEntry[]} list - The list of all temperature and precipitation measurements from openweathermap within the designated range.
 * @returns {Record<string, Components[]>} - An object with attributes for all dates in the designated range and values as arrays containing all collected data for each date.
 */
const groupedByDate = (list: WeatherEntry[]): Record<string, PrecipitationEntry[]> => {
    return list.reduce((acc: Record<string, PrecipitationEntry[]>, { dt, pop, main }) => {
        const date = moment.unix(dt).format('DD-MM-YYYY');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push({
            precipitation: pop,
            temperature: main.temp,
        })
        return acc;
    }, {});
}