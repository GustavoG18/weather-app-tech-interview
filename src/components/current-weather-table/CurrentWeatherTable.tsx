import { useWeather, WeatherService } from "@/hooks/use-weather"

const FAKE_LAT = "10.992960";
const FAKE_LONG = "-74.779907";

export const CurrentWeatherTable = () => {
    const { data, loading, error } = useWeather(WeatherService.CurrentWeather, {
        lat: FAKE_LAT,
        long: FAKE_LONG
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;
    
    return (
        <table className="border-collapse border border-slate-500">
            <tbody>
                {
                    data?.map(({ key, value }) => (
                        <tr key={`${key}-${value}`}>
                            <td className="border border-slate-700">{key}</td>
                            <td className="border border-slate-700">{value}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}