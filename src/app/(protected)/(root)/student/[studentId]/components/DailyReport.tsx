"use client";
import BarChart from "@/components/charts/BarChart";
import { IStudentDailyReport } from "@/helpers/types";
import { formatDate } from "@/helpers/utils";

const DailyReport = ({
  studentDailyReport,
}: {
  studentDailyReport: IStudentDailyReport;
}) => {
  const dailyReportQuiz =
    studentDailyReport.date &&
    formatDate(new Date(studentDailyReport.date)) ===
      formatDate(new Date(Date.now()))
      ? studentDailyReport.quiz
      : 0;

  const dailyReportSession =
    studentDailyReport.date &&
    formatDate(new Date(studentDailyReport.date)) ===
      formatDate(new Date(Date.now()))
      ? studentDailyReport.session
      : 0;

  return (
    <div className="px-3 md:px-6 bg-[#FBFAFC] rounded-2xl border border-[#D8D5D5] shadow-custom-black py-2">
      <h4 className="text-base font-bold">Today</h4>
      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between px-5">
        <div className="w-full flex flex-row md:flex-col justify-between gap-4">
          <div>
            <div className="font-mada-semibold text-2xl">
              {dailyReportSession}%
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded size-3 bg-primary" />
              <div className="font-mada-medium text-sm">Topics revised</div>
            </div>
          </div>

          <div>
            <div className="font-mada-semibold text-2xl">
              {dailyReportQuiz}%
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded size-3 bg-cyan-500" />
              <div className="font-mada-medium text-sm">Revision accuracy</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-center">
          <BarChart
            series={[
              { name: "Sessions", data: [dailyReportSession || 0] },
              { name: "Quizzes", data: [dailyReportQuiz || 0] },
            ]}
            categories={["Today"]}
            colors={["#9654F4", "#72EFDD"]}
            hideLegend={true}
            height={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
