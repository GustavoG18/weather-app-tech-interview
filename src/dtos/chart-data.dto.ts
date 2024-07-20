import { AirQuality, AirQualityResponse, Components } from "@/interfaces/air-polution.interface";
import { ChartData } from "@/interfaces/chart.interface";
import { FiveDayForecastResponse, WeatherEntry } from "@/interfaces/precipitation-temperature.interface";
import moment from "moment";

interface PrecipitationEntry {
    precipitation: number;
    temperature: number;
}

type Data = Components | PrecipitationEntry;

/**
 * This function groups all measurements of the same day into a single attribute of an object,
 * so that another function can later calculate the average for that day.
 * 
 * @param {WeatherEntry[] | AirQuality[]} list - The list of all temperature, precipitation, and air pollution measurements from openweathermap within the designated range.
 * @returns {Record<string, Components[] | PrecipitationEntry[]>} - An object with attributes for all dates in the designated range and values as arrays containing all collected data for each date.
 */
export const groupedByDate = (list: AirQuality[] | WeatherEntry[]) => {
    return list.reduce((acc: Record<string, Data[]>, { dt, ...rest }) => {
        const date = moment.unix(dt).format('DD-MMM-YYYY');
        if (!acc[date]) {
            acc[date] = [];
        }
        if ("pop" in rest) {
            acc[date].push({
                precipitation: rest["pop"] * 100,
                temperature: rest["main"]["temp"],
            } as PrecipitationEntry)
        } else {
            acc[date].push(rest["components"] as Components);
        }
        return acc;
    }, {});
}

/**
 * The main purpose of this function is to model the forecast 5 days and air pollution historical data from OpenWeather
 * into a format that can be graphed with the Recharts library.
 * 
 * @param {WeatherEntry[] | AirQuality[]} list - The raw response from OpenWeather's forecast 5 days or air pollution historical data.
 * @returns {ChartData[]} - An array of objects ready for Recharts to understand and graph.
 */
export const parseChartResponse = ({ list }: FiveDayForecastResponse | AirQualityResponse): ChartData[] => {
    let groupDates = {};
    if ("pop" in list) {
        groupDates = groupedByDate(list) as Record<string, PrecipitationEntry[]>;
    } else {
        groupDates = groupedByDate(list) as Record<string, Components[]>;
    }
    return Object.entries(groupDates).map(([date, precipitationEntryArray]) => {
        const numEntries = (precipitationEntryArray as Components[] | PrecipitationEntry[]).length;

        const avgComponents = (precipitationEntryArray as Components[] | PrecipitationEntry[]).reduce((acc: Partial<PrecipitationEntry & Components>, values: Partial<PrecipitationEntry & Components>) => {
            (Object.keys(values) as (keyof PrecipitationEntry)[]).forEach(key => {
                if (!acc[key]) {
                    acc[key] = 0;
                }
                acc[key]! += values[key]!;
            });
            return acc;
        }, {} as Partial<PrecipitationEntry> | Partial<Components>);

        (Object.keys(avgComponents) as (keyof PrecipitationEntry)[]).forEach(key => {
            avgComponents[key]! /= numEntries;
        });

        return {
            date,
            ...avgComponents,
        } as ChartData;
    });
}