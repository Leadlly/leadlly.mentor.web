"use client";
import RadialBarChart from "@/components/charts/RadialBarChart";
import { formatDate } from "@/helpers/utils";

const DailyReport = ({ dailyreportquiz, dailyreportsession }: any) => {
  return (
    <div className="px-3 bg-[#FBFAFC] rounded-2xl border-[1px] border-[#D8D5D5] shadow-custom-black py-2">
      <h4 className="text-xs md:text-sm font-bold">Daily Report</h4>
      <div className="flex flex-wrap justify-center">
        <div className="chart-container">
          <RadialBarChart
            series={[dailyreportquiz, dailyreportsession]}
            colors={["#9654F4", "#72EFDD"]}
            labels={["Sessions", "Quizzes"]}
            dataLabel="overall"
            width="100%" 
            hollowSize="45%"
            fontSize="18px"
          />
        </div>
        <div className="legend-container flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded bg-primary"></span>
            <span className="text-xs capitalize">Sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded bg-[#72EFDD]"></span>
            <span className="text-xs capitalize">Quizzes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
