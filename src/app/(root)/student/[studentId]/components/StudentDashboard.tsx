import Avatar from "@/components/shared/Avatar";
import React from "react";
import PointsBox from "./Pointsbox";
import MoodOfTheWeek from "./MoodOfTheWeek";
import SubjectStreak from "./TotalStreak";
import DailyReport from "./DailyReport";
import SubjectProgress from "./SubjectProgress";
import ProgressAnalytics from "./ProgressAnalytics";

export default function StudentDashboard() {
  return (
    <div className="bg-[#E8E3F063] py-2 px-4 border-[#DDDDDD] border-[1px] rounded-tr-2xl max-w-[680px] min-w-[680px] ">
      <div className="bg-[#CDAAFF] rounded-t-2xl flex  px-7 pt-6 pb-2 justify-between">
        <div className="flex justify-center items-center gap-4">
          <Avatar alt="student" size={76} />
          <div className="text-center ">
            <div className="text-[#5F5F5F] font-semibold text-2xl">
              John Musk
            </div>
            <div className="text-white font-semibold text-base">Class: 9th</div>
          </div>
        </div>
        <PointsBox />
      </div>
      <div className="flex w-full gap-2 mt-4 pb-2 border-b-2 border-[#DEDEDE]">
        <MoodOfTheWeek />
        <SubjectStreak />
      </div>
      <div className="flex gap-2 pt-1 mb-3">
        <DailyReport/>
        <SubjectProgress/>
      </div>
      <ProgressAnalytics/>
    </div>
  );
}
