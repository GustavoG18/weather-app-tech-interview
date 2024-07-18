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

const FAKE_LAT = "10.992960";
const FAKE_LONG = "-74.779907";

export const PrecipitationTemperatureGraph = () => {
  const { data, loading, error } = useWeather(WeatherService.FiveDayForecast, {
    lat: FAKE_LAT,
    long: FAKE_LONG,
  });

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <ChartContainer config={chartConfig}>
      <ComposedChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => value.split('-')[1]}
          angle={-90}
        />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="precipitation"
          type="monotone"
          stroke={chartConfig["precipitation"].color}
          strokeWidth={2}
          dot={false}
        />
        <Area  
          dataKey="temperature"
          type="monotone"
          stroke={chartConfig["temperature"].color}
          fill={chartConfig["temperature"].color}
          strokeWidth={2}
          dot={false} />
      </ComposedChart>
    </ChartContainer>
  )
};
