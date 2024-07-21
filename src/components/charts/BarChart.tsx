"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart = ({ weekly }: { weekly: any }) => {
  const series = useMemo(() => {
    if (!Array.isArray(weekly)) return [];

    const sessionData = weekly.map((day) => day.session);
    const quizData = weekly.map((day) => day.quiz);

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
  }, [weekly]);

  return (
    <>
      <div className="flex-1">
        <Charts
          type="bar"
          width={"100%"}
          height={125}
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
            xaxis: {
              categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
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

      <div className="w-36 hidden md:block">
        <div className="flex items-center gap-2">
          <span className=" block w-3 h-3 rounded bg-[#9654F4]"></span>
          <span className="text-xs capitalize font-semibold">
            Revision Sessions
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className=" block w-3 h-3 rounded bg-[#72EFDD]"></span>
          <span className="text-xs capitalize font-semibold">Quizzes</span>
        </div>
      </div>
    </>
  );
};

export default BarChart;
