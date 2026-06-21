"use client";

import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp } from "lucide-react";

import {
  getMonthlyReport,
  getOverallReport,
  getWeeklyReport,
} from "@/actions/student_report_actions";
import AreaChart from "@/components/charts/AreaChart";
import AreaChartOver from "@/components/charts/AreaChartOver";
import BarChart from "@/components/charts/BarChart";
import TabContent from "@/components/shared/TabContent";
import TabNavItem from "@/components/shared/TabNavItem";
import { cn } from "@/lib/utils";

const progressAnalyticsMenus = [
  {
    id: "weekly",
    title: "Weekly",
  },
  {
    id: "monthly",
    title: "Monthly",
  },
  {
    id: "overall",
    title: "Overall",
  },
];

const ProgressAnalytics = ({ studentId }: { studentId: string }) => {
  const [activeTab, setActiveTab] = useState("weekly");

  const { data: weeklyReport } = useQuery({
    queryKey: ["weeklyReport", studentId],
    queryFn: () => getWeeklyReport(studentId),
    enabled: !!studentId,
  });

  const { data: monthlyReport } = useQuery({
    queryKey: ["monthlyReport", studentId],
    queryFn: () => getMonthlyReport(studentId),
    enabled: !!studentId,
  });

  const { data: overallReport } = useQuery({
    queryKey: ["overallReport", studentId],
    queryFn: () => getOverallReport(studentId),
    enabled: !!studentId,
  });

  const weeklySeries = React.useMemo(() => {
    const days = weeklyReport?.weeklyReport?.days;
    if (!Array.isArray(days)) return [];

    return [
      {
        name: "Topics revised",
        data: days.map((day: any) => day.session),
      },
      {
        name: "Revision accuracy",
        data: days.map((day: any) => day.quiz),
      },
    ];
  }, [weeklyReport]);

  return (
    <div className="px-3 flex-1 pt-2 bg-[#FBFAFC] rounded-2xl border border-[#D8D5D5] shadow-custom-black">
      <div className="flex flex-col items-start md:flex-row gap-4 md:items-center justify-between">
        <h4 className="text-xs md:text-sm font-bold">Progress Analytics</h4>
        <ul className="flex items-center gap-1 border p-1.5 rounded-full">
          {progressAnalyticsMenus.map((tab) => (
            <TabNavItem
              key={tab.id}
              title={tab.title}
              id={tab.id}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              layoutIdPrefix="progress_analytics"
              activeTabClassName="h-full inset-0"
            />
          ))}
        </ul>
      </div>

      {activeTab === "weekly" && weeklyReport?.weeklyReport?.metrics && (
        <div className="w-full flex justify-between mt-4">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="font-medium text-sm">Topics revised</div>
            <div className="flex items-center gap-x-1 mt-0.5">
              {weeklyReport?.weeklyReport?.metrics.topicsRevisedChange >= 0 ? (
                <ArrowUp size={14} color={"#16a34a"} />
              ) : (
                <ArrowDown size={14} color={"#dc2626"} />
              )}

              <div
                className={cn(
                  "font-semibold text-xl",
                  weeklyReport?.weeklyReport?.metrics.topicsRevisedChange >= 0
                    ? "text-[#16a34a]"
                    : "text-[#dc2626]"
                )}
              >
                {Math.abs(
                  weeklyReport?.weeklyReport?.metrics.topicsRevisedChange
                )}
                %
              </div>
              <div className="text-xs">
                {weeklyReport?.weeklyReport?.metrics.topicsRevisedChange >= 0
                  ? "more"
                  : "less"}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="font-medium text-sm">Revision accuracy</div>
            <div className="flex items-center gap-x-1 mt-0.5">
              {weeklyReport?.weeklyReport?.metrics.revisionAccuracyChange >=
              0 ? (
                <ArrowUp size={14} color={"#16a34a"} />
              ) : (
                <ArrowDown size={14} color={"#dc2626"} />
              )}

              <div
                className={cn(
                  "font-semibold text-xl",
                  weeklyReport?.weeklyReport?.metrics.revisionAccuracyChange >=
                    0
                    ? "text-[#16a34a]"
                    : "text-[#dc2626]"
                )}
              >
                {Math.abs(
                  weeklyReport?.weeklyReport?.metrics.revisionAccuracyChange
                )}
                %
              </div>
              <div className="text-sm">
                {weeklyReport?.weeklyReport?.metrics.revisionAccuracyChange >= 0
                  ? "more"
                  : "less"}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-full min-h-40 overflow-hidden">
        <TabContent id="weekly" activeTab={activeTab}>
          <div className="flex flex-col items-center w-full">
            <BarChart
              series={weeklySeries}
              categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
              colors={["#9654F4", "#56CFE1"]}
            />
          </div>
        </TabContent>
        <TabContent id="monthly" activeTab={activeTab}>
          <div className="flex items-center gap-3">
            <AreaChart monthly={monthlyReport?.monthlyReport?.days} />
          </div>
        </TabContent>
        <TabContent id="overall" activeTab={activeTab}>
          <div className="flex items-center gap-3">
            <AreaChartOver progress={overallReport?.overallReport} />
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
