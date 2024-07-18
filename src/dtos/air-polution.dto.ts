import { AirQualityResponse } from "@/interfaces/air-polution.interface";
import { ChartData } from "@/interfaces/chart.interface";
import moment from "moment";

export const parseAirPolutionResponse = ({ list }: AirQualityResponse): ChartData[] => {
    return list.map(({ dt, components }) => {
        const date = moment.unix(dt).format('DD-MMM-YYYY');
        return {
            date,
            ...components,
        }
    });
}