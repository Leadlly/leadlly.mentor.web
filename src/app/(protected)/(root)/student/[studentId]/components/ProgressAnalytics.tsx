"use client";

import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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
import { monthlyReport, overallReport, weeklyReport } from "@/helpers/types";

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

  return (
    <div className="px-3 flex-1 pt-2 bg-[#FBFAFC] rounded-2xl border border-[#D8D5D5] shadow-custom-black">
      <div className="flex items-center justify-between">
        <h4 className="text-xs md:text-sm font-bold">Progress Analytics</h4>
        <ul className="flex items-center gap-1 border border-[#989898] p-1 rounded">
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

      <div className="w-full h-full overflow-hidden">
        <TabContent id="weekly" activeTab={activeTab}>
          <div className="flex items-center gap-3">
            <BarChart weekly={weeklyReport?.weeklyReport?.days} />
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
