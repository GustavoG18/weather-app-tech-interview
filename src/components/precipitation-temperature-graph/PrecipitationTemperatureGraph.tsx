import { useWeather, WeatherService } from "@/hooks/use-weather";
import { Area, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartData } from "@/interfaces/chart.interface";
import { Loading } from "@/components/loading/Loading";
import { DangerAlert } from "@/components/alert/DangerAlert";

export const PrecipitationTemperatureGraph = () => {
  const { data, loading, error } = useWeather<ChartData[]>(WeatherService.FiveDayForecast);

  const chartConfig = {
    precipitation: {
      label: "precipitation",
      color: "#FF4242",
    },
    temperature: {
      label: "temperature",
      color: "#2EC4B6",
    }
  } satisfies ChartConfig;

  if (loading) return <Loading  />;;
  if (error) return <DangerAlert error={error} />;

  return (
    <div className="border border-slate-800 p-4 rounded-lg">
      <h2 className="text-white text-1xl w-full text-center font-bold capitalize">
        Next 5 days temperature vs precipitation
      </h2>
      <ChartContainer config={chartConfig}>
        <ComposedChart
          accessibilityLayer
          data={data}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.split("-")[0]}
            angle={-90}
            stroke="#ffffff"
          />
          <YAxis stroke="#ffffff"/>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} wrapperStyle={{ color: '#ffffff', textTransform: 'capitalize' }}/>
          <Area
            dataKey="temperature"
            type="monotone"
            stroke={chartConfig["temperature"].color}
            fill={chartConfig["temperature"].color}
            strokeWidth={2}
            dot={false} />
          <Line
            dataKey="precipitation"
            type="monotone"
            stroke={chartConfig["precipitation"].color}
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  )
};
