import { DashboardLayout } from "../../layout/DashboardLayout"
import { AirPolutionGraph } from "@/components/air-polution-graph/AirPolutionGraph"

export const Dashboard = () => {
    return <DashboardLayout>
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
        <AirPolutionGraph />
    </DashboardLayout>
}