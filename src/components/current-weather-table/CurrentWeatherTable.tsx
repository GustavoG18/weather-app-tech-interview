import { useWeather, WeatherService } from "@/hooks/use-weather"

export const CurrentWeatherTable = () => {
    const { data, loading, error } = useWeather(WeatherService.CurrentWeather);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
            <tbody className="divide-y divide-gray-200">
                {
                    data?.map(({ key, value }) => (
                        <tr key={`${key}-${value}`} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}