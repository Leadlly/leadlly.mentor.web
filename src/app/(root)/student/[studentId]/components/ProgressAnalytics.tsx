"use client";

import AreaChart from "@/components/charts/AreaChart";
import BarChart from "@/components/charts/BarChart";
import TabContent from "@/components/shared/TabContent";
import TabNavItem from "@/components/shared/TabNavItem";
import AreaChartOver from "@/components/charts/AreaChartOver";
import { useState, useEffect } from "react";
import { weeklyReport, monthlyReport, overallReport } from "@/helpers/types";
import { toast } from "sonner";
import { getWeeklyReport,getMonthlyReport } from "@/actions/student_report_actions";
import { usePathname } from "next/navigation";

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

const ProgressAnalytics = ({ monthly, weekly }: any) => {
  const [activeTab, setActiveTab] = useState("weekly");
  const [reportweekly, setReportweekly] = useState<weeklyReport | null>(null);
  const [reportmonthly, setreportmonthly] = useState<monthlyReport | null>(null);
  const pathname = usePathname();
  const segments = pathname.split('/');
  const studentId = segments[segments.length - 2];

  useEffect(() => {
    const getReportweekly = async () => {
      try {
        const data = await getWeeklyReport(studentId);
        const weekly = data.weeklyReport;
        setReportweekly(weekly);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getReportweekly();
  }, [studentId]);

  useEffect(() => {
    const getreportmonthly = async () => {
      try {
        const data = await getMonthlyReport(studentId);
        const monthly = data.monthlyReport;
        setreportmonthly(monthly);
      } catch (error:any) {
        toast.error(error.message);
      }
    };

    getreportmonthly();
  }, [studentId]);

  return (
    <div className="px-3 flex-1 pt-2 bg-[#FBFAFC] rounded-2xl border-[1px] border-[#D8D5D5] shadow-custom-black">
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
            <BarChart weekly={reportweekly?.days} />
          </div>
        </TabContent>
        <TabContent id="monthly" activeTab={activeTab}>
          <div className="flex items-center gap-3">
            <AreaChart monthly={reportmonthly?.days}/>
          </div>
        </TabContent>
        <TabContent id="overall" activeTab={activeTab}>
          <div className="flex items-center gap-3">
            <AreaChartOver />
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
