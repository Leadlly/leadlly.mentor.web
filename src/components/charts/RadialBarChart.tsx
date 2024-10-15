"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import RadialBarChartSkeleton from "./_skeletons/RadialBarChartSkeleton";
import { ISubject } from "@/helpers/types";

const Charts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <RadialBarChartSkeleton />,
});

type RadialBarChartProps = {
  series: number[];
  colors: string[];
  labels: string[];
  dataLabel: string;
  width: string;
  hollowSize: string;
  fontSize?: string;
  subject?: ISubject;
};

const RadialBarChart = ({
  series,
  colors,
  labels,
  dataLabel,
  width,
  hollowSize,
  fontSize,
  subject,
}: RadialBarChartProps) => {
  const [currentHollowSize, setCurrentHollowSize] = useState(hollowSize);

  // Adjust hollow size based on screen width for responsiveness
  useEffect(() => {
    const updateHollowSize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        // Small screens
        setCurrentHollowSize("40%"); // Smaller hollow size for mobile devices
      } else if (screenWidth < 1024) {
        // Medium screens
        setCurrentHollowSize("40%");
      } else {
        // Large screens
        setCurrentHollowSize(hollowSize); // Use default size for larger screens
      }
    };

    // Set initial size on load
    updateHollowSize();

    // Update hollow size when the window is resized
    window.addEventListener("resize", updateHollowSize);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", updateHollowSize);
  }, [hollowSize]);

  return (
    <div className="relative h-full">
      <Charts
        type="radialBar"
        width={width}
        height={"100%"}
        series={series}
        options={{
          chart: {
            height: "100%",
            type: "radialBar",
          },
          colors: colors,
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 5,
                size: currentHollowSize, // Use responsive hollow size
              },
              dataLabels: {
                show: labels.includes("No. of Questions Solved") ? false : true,
                value: {
                  fontSize: fontSize ?? "18px",
                  fontWeight: 600,
                  fontFamily: "Mada, sans-serif",
                  offsetY: 2,
                },
                name: {
                  show: false,
                },
                total: {
                  show: true,
                  formatter: function (w) {
                    const sum = w?.globals?.series.reduce(
                      (acc: number, value: number) => acc + value,
                      0
                    );
                    const average = sum / w?.globals?.series.length;
                    const averagePercentage = Math.round(
                      (average / 100) * 100
                    );
                    return `${averagePercentage}%`;
                  },
                },
              },
            },
          },
          labels: labels,
          stroke: {
            lineCap: "round",
          },
        }}
      />

      {/* Custom Label in the Center */}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          dataLabel === "questions" ? "-mt-3" : ""
        )}
      >
        {/* Display Number of Questions Solved */}
        {labels.includes("No. of Questions Solved") && (
          <p className="text-2xl leading-none font-semibold text-center">
            {subject?.total_questions_solved.number! > 120
              ? "120+"
              : subject?.total_questions_solved.number}
          </p>
        )}
        {/* Data Label Text */}
        <p
          className={cn(
            "text-sm leading-none font-medium mt-2 capitalize",
            dataLabel === "overall" ? "text-[10px] text-[#a9a9a9] -mt-1" : "",
            dataLabel === "questions" ? "-mt-[1px]" : ""
          )}
        >
          {dataLabel}
        </p>
      </div>
    </div>
  );
};

export default RadialBarChart;
