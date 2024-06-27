import Avatar from "@/components/shared/Avatar";
import React from "react";
import PointsBox from "./Pointsbox";
import MoodOfTheWeek from "./MoodOfTheWeek";
import SubjectStreak from "./TotalStreak";
import DailyReport from "./DailyReport";
import SubjectProgress from "./SubjectProgress";
import ProgressAnalytics from "./ProgressAnalytics";
import Link from "next/link";

export default function StudentDashboard({studentId}:{studentId:string}) {
  return (
    <>
    <div className="bg-[#E8E3F063] lg:block hidden py-2 px-4 border-[#DDDDDD] border-[1px] rounded-tr-2xl max-w-[680px] min-w-[680px] ">
      <div className="bg-[#CDAAFF] rounded-t-2xl flex  px-7 pt-6 pb-2 justify-between">
        <div className="flex justify-center items-center gap-4">
          <Avatar alt="student" size={76} />
          <div className="text-center ">
            <div className="text-[#5F5F5F] font-semibold text-2xl">
              John Musk
            </div>
            <div className="text-white font-semibold text-base">Class: 9th</div>
            <Link
              href={`/student-profile/${studentId}`}
              className="bg-white text-xs font-semibold text-[#9654F4] px-[5px] py-[1px] rounded"
            >
              view profile
            </Link>
          </div>
        </div>
        <PointsBox />
      </div>
      <div className="flex w-full gap-2 mt-4 pb-2 border-b-2 border-[#DEDEDE]">
        <MoodOfTheWeek />
        <SubjectStreak />
      </div>
      <div className="flex gap-2 pt-1 mb-3">
        <DailyReport />
        <SubjectProgress />
      </div>
      <ProgressAnalytics />
    </div>
    <div className="bg-[] py-2 px-4 lg:hidden rounded-tr-2xl w-full">
    <div className="bg-[#E8DAFE75] rounded-t-2xl flex px-3 md:px-7 pt-6 pb-2 justify-between">
      <div className="flex justify-center items-center gap-1 md:gap-4">
        <Avatar alt="student" size={62} />
        <div className="text-center ">
          <div className="text-[#5F5F5F] font-semibold text-[17px] md:text-2xl">
            John Musk
          </div>
          <div className="text-[#989898] font-semibold text-[11px] md:text-base">Class: 9th</div>
          <Link
            href={`/student-profile/${studentId}`}
            className="bg-white text-[8px] md:text-xs font-semibold text-[#9654F4] px-[5px] py-[1px] rounded"
          >
            view profile
          </Link>
        </div>
      </div>
      <PointsBox />
    </div>
    <div className="flex w-full gap-2 mt-4 pb-2 border-b-2 border-[#DEDEDE]">
      <MoodOfTheWeek />
      <SubjectStreak />
    </div>
    <div className="flex gap-2 pt-1 mb-3">
      <DailyReport />
      <SubjectProgress />
    </div>
    <ProgressAnalytics />
  </div></>
    
  );
}
