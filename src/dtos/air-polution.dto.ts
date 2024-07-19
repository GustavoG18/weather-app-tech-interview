import { AirQuality, AirQualityResponse, Components } from "@/interfaces/air-polution.interface";
import { ChartData } from "@/interfaces/chart.interface";
import moment from "moment";

/**
 * The main purpose of this function is to model the air pollution historical data from OpenWeather 
 * into a format that can be graphed with Recharts library.
 * This function first calls the `groupedByDate` function to organize the data for each day into a single object attribute.
 * Then, it calculates the average of each air pollution measurement attribute for the same day.
 * As a result, it returns a date with the average of each attribute for that date, ready for Recharts to understand and graph.
 * 
 * @param {AirQualityResponse} airPolutionResponse - The raw response from OpenWeather's air pollution historical data.
 * @returns {ChartData[]} - An array of objects ready for Recharts to understand and graph.
 */
export const parseAirPolutionResponse = ({ list }: AirQualityResponse): ChartData[] => {
    return Object.entries(groupedByDate(list)).map(([date, componentsArray]) => {
        const numEntries = componentsArray.length;

        const avgComponents = componentsArray.reduce((acc: Partial<Components>, components: Components) => {
            (Object.keys(components) as (keyof Components)[]).forEach(key => {
                if (!acc[key]) {
                    acc[key] = 0;
                }
                acc[key]! += components[key];
            });
            return acc;
        }, {} as Partial<Components>);

        (Object.keys(avgComponents) as (keyof Components)[]).forEach(key => {
            avgComponents[key]! /= numEntries;
        });

        return {
            date,
            ...avgComponents,
        } as ChartData;
    });
}

/**
 * The "openweathermap" API at its air pollution historical endpoint returns multiple measurements for the same day, 
 * making the graph very heavy if the date range is extensive.
 * This function groups all measurements of the same day into a single attribute of an object,
 * so that another function can later calculate the average for that day.
 * 
 * @param {AirQuality[]} list - The list of all air pollution measurements from openweathermap within the designated range.
 * @returns {Record<string, Components[]>} - An object with attributes for all dates in the designated range and values as arrays containing all collected data for each date.
 */
const groupedByDate = (list: AirQuality[]): Record<string, Components[]> => {
    return list.reduce((acc: Record<string, Components[]>, { dt, components }) => {
        const date = moment.unix(dt).format('DD-MMM-YYYY');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(components);
        return acc;
    }, {});
}