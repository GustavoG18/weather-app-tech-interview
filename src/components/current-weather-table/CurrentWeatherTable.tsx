import { useWeather, WeatherService } from "@/hooks/use-weather"
import { TableInformation } from "@/interfaces/current-weather.interface";
import { Loading } from "@/components/loading/Loading";
import { DangerAlert } from "@/components/alert/DangerAlert";

export const CurrentWeatherTable = () => {
    const { data, loading, error } = useWeather<TableInformation>(WeatherService.CurrentWeather);

    if (loading) return <Loading />;
    if (error) return <DangerAlert error={error} />;

    return (
        <div className="flex flex-wrap gap-10 border p-6 rounded-lg border-slate-800">
            <table className="grow divide-y order-2 divide-slate-800 bg-transparent shadow-md rounded-lg overflow-hidden">
                <tbody className="divide-y divide-slate-800">
                    {
                        data?.dataTable?.map(({ key, value }) => (
                            <tr key={`${key}-${value}`} className="hover:bg-slate-900">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">{key}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-200">{value}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="grow flex flex-col text-slate-100 justify-center items-center">
                <h2 className="text-5xl p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">{data?.title}</h2>
                <img className="w-32" src={data?.icon} />
                <span className="text-2xl text-slate-100 capitalize">{data?.description}</span>
            </div>
        </div>
    );
}