import { PrecipitationTemperatureGraph } from "@/components/precipitation-temperature-graph/PrecipitationTemperatureGraph"
import { DashboardLayout } from "../../layout/DashboardLayout"
import { AirPolutionGraph } from "@/components/air-polution-graph/AirPolutionGraph"
import { CurrentWeatherTable } from "@/components/current-weather-table/CurrentWeatherTable"

export const Dashboard = () => {
    return <DashboardLayout>
        <AirPolutionGraph />
        <PrecipitationTemperatureGraph />
        <CurrentWeatherTable />
    </DashboardLayout>
}