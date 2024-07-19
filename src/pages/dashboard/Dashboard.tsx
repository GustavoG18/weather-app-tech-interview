import { PrecipitationTemperatureGraph } from "@/components/precipitation-temperature-graph/PrecipitationTemperatureGraph"
import { DashboardLayout } from "@/layout/DashboardLayout"
import { AirPolutionGraph } from "@/components/air-polution-graph/AirPolutionGraph"
import { CurrentWeatherTable } from "@/components/current-weather-table/CurrentWeatherTable"

export const Dashboard = () => {
    return <DashboardLayout>
        <div className="grid grid-cols-2">
            <CurrentWeatherTable />
            <PrecipitationTemperatureGraph />
            <div className="col-span-2">
                <AirPolutionGraph />
            </div>
        </div>
    </DashboardLayout>
}