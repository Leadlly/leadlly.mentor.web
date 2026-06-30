"use client";

import dynamic from "next/dynamic";

const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

export type BarChartSeries = {
  name: string;
  data: number[];
};

interface BarChartProps {
  series: BarChartSeries[];
  categories?: string[];
  colors?: string[];
  height?: number | string;
  hideLegend?: boolean;
}

const BarChart = ({
  series,
  categories,
  colors = ["#9654F4", "#56CFE1"],
  height = 125,
  hideLegend = false,
}: BarChartProps) => {
  return (
    <>
      <div className="flex-1 w-full min-w-0">
        <Charts
          type="bar"
          width={"100%"}
          height={height}
          series={series}
          options={{
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "30%",
                borderRadius: 1.5,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: true,
              width: 3,
              colors: ["transparent"],
            },
            ...(categories && {
              xaxis: {
                categories: categories,
              },
            }),
            fill: {
              colors: colors,
            },
            legend: {
              show: false,
            },
          }}
        />
      </div>

      {!hideLegend && (
        <div className="flex items-center justify-around w-full px-4">
          {series.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2 mb-2">
              <span
                className="block w-3 h-3 rounded"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></span>
              <span className="text-xs capitalize font-semibold">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BarChart;
