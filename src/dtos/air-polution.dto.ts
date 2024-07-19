import { AirQualityResponse, Components } from "@/interfaces/air-polution.interface";
import { ChartData } from "@/interfaces/chart.interface";
import moment from "moment";

export const parseAirPolutionResponse = ({ list }: AirQualityResponse): ChartData[] => {
    const groupedByDate = list.reduce((acc: Record<string, Components[]>, { dt, components }) => {
        const date = moment.unix(dt).format('DD-MMM-YYYY');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(components);
        return acc;
    }, {});

    const averagedData: ChartData[] = Object.entries(groupedByDate).map(([date, componentsArray]) => {
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

    return averagedData;
}