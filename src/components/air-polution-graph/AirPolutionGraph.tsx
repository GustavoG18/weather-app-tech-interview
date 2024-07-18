import { useEffect, useState } from "react";
import { useWeather, WeatherService } from "@/hooks/use-weather";
import { getRandomColor } from "@/lib/utilities/random-color";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import moment from "moment";

export const AirPolutionGraph = () => {
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const { data, loading, error, errorLocation } = useWeather(WeatherService.AirPollution, {
    startDate: moment().subtract(3, 'months').unix().toString(),
    endDate: moment().unix().toString(),
  });
  
  useEffect(() => {
    if (data) {
      const keys = Object.keys(data[0]).filter(key => key !== 'date');
      const config: ChartConfig = {};
      keys.forEach(key => {
        config[key] = {
          label: key,
          color: getRandomColor(),
        };
      });
      setChartConfig(config);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <ChartContainer config={chartConfig}>
      <LineChart
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
        {data &&
          Object.keys(chartConfig).map(dataKey => (
            <Line
              key={dataKey}
              dataKey={dataKey}
              type="monotone"
              stroke={chartConfig[dataKey].color}
              strokeWidth={2}
              dot={false}
            />
          ))}
      </LineChart>
    </ChartContainer>
  );
};