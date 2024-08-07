"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

const AreaChart = ({monthly}:{monthly:any}) => {
  const series = useMemo(() => {
    if (!Array.isArray(monthly)) return [];

    const sessionData = monthly.map((day) => day.session);
    const quizData = monthly.map((day) => day.quiz);

    return [
      {
        name: "Revisions",
        data: sessionData,
      },
      {
        name: "Quizzes",
        data: quizData,
      },
    ];
  }, [monthly]);
  return (
    <>
      <div className="flex-1">
        <Charts
          type="area"
          width={"100%"}
          height={125}
          series={series}
          options={{
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
              width: [1, 1],
            },
            xaxis: {
              type: "category",
              categories: ["Jan12", "Feb12"],
            },
            fill: {
              colors: ["#9654F4", "#56CFE1"],
            },
            legend: {
              show: false,
            },
          }}
        />
      </div>
    </>
  );
};

export default AreaChart;
