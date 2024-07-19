import { useEffect, useState } from "react";
import { useWeather, WeatherService } from "@/hooks/use-weather";
import { getRandomColor } from "@/lib/utils";
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
import { ChartData } from "@/interfaces/chart.interface";
import { Loading } from "@/components/loading/Loading";
import { DangerAlert } from "@/components/alert/DangerAlert";

export const AirPolutionGraph = () => {
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const { data, loading, error } = useWeather<ChartData[]>(WeatherService.AirPollution, {
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

  if (loading) return <Loading  />;
  if (error) return <DangerAlert error={error} />;

  return (
    <div className="border border-slate-800 p-4 rounded-lg">
      <h3 className="text-white text-1xl w-full text-center font-bold capitalize">
        Last 3 months air polution
      </h3>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={data}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={true}
            axisLine={true}
            tickMargin={10}
            tickFormatter={(value) => value.split('-')[1]}
            angle={-90}
            stroke="#ffffff"
          />
          <YAxis stroke="#ffffff" />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} wrapperStyle={{ color: '#ffffff', textTransform: 'capitalize' }} />
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
    </div>
  );
};