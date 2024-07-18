import moment from "moment";

interface Coord {
    lon: number;
    lat: number;
}

interface Main {
    aqi: number;
}

interface Components {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
}

interface AirQuality {
    main: Main;
    components: Components;
    dt: number;
}

export interface AirQualityData {
    coord: Coord;
    list: AirQuality[];
}

export interface ChartData {
    [key: string]: string | number;
}


export const parseAirPolutionResponse = ({ list }: AirQualityData): ChartData[] => {
    return list.map(({ dt, components }) => {
        const date = moment.unix(dt).format('DD-MMM-YYYY');
        return {
            date,
            ...components,
        }
    });
}