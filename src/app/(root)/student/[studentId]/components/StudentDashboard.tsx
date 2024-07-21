import Avatar from "@/components/shared/Avatar";
import React from "react";
import PointsBox from "./Pointsbox";
import MoodOfTheWeek from "./MoodOfTheWeek";
import SubjectStreak from "./TotalStreak";
import DailyReport from "./DailyReport";
import SubjectProgress from "./SubjectProgress";
import ProgressAnalytics from "./ProgressAnalytics";
import Link from "next/link";
import { useState,useEffect } from "react";
import { Studentinfo } from "@/actions/user_actions";
import { toast } from "sonner";
import {  Studentinformation } from "@/helpers/types";
import { overallReport } from "@/helpers/types";
import {getOverallReport } from "@/actions/student_report_actions";

export default function StudentDashboard({studentId}:{studentId:string}) {
  const [studentData, setStudentData] = useState<Studentinformation | null>(null);
  // const [reportoverall, setreportoverall] = useState<overallReport | null>(null);

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const data = await Studentinfo(studentId);
        const student = data.student;
        setStudentData(student);
      } catch (error:any) {
        toast.error(error.message);
      }
    };

    getStudentData();
  }, [studentId]);

  // useEffect(() => {
  //   const getreportoverall = async () => {
  //     try {
  //       const data = await getOverallReport(studentId);
  //       const overall = data.overallReport;
  //       setreportoverall(overall);
  //     } catch (error:any) {
  //       toast.error(error.message);
  //     }
  //   };

  //   getreportoverall();
  // }, [studentId]);


  if (!studentData) {
    return <div className="bg-[#E8E3F063] lg:block hidden lg:overflow-y-auto custom__scrollbar py-2 px-4 border-[#DDDDDD] border-[1px] rounded-tr-2xl w-full">Loading...</div>;
  }
  return (
    <>
    <div className="bg-[#E8E3F063] lg:block hidden lg:overflow-y-auto custom__scrollbar py-2 px-4 border-[#DDDDDD] border-[1px] rounded-tr-2xl w-full">
      <div className="bg-[#CDAAFF] rounded-t-2xl flex  px-7 pt-6 pb-2 justify-between">
        <div className="flex justify-center items-center gap-4">
          <Avatar alt="student" size={76} />
          <div className="text-center ">
            <div className="text-[#5F5F5F] font-semibold text-2xl">
              {studentData.firstname} {studentData.lastname}
            </div>
            <div className="text-white font-semibold text-base">Class:{studentData.academic.standard}</div>
            <Link
              href={`/student-profile/${studentId}`}
              className="bg-white text-xs font-semibold text-[#9654F4] px-[5px] py-[1px] rounded"
            >
              view profile
            </Link>
          </div>
        </div>
        <PointsBox points={studentData.details.points.number} level={studentData.details.level.number} streak={studentData.details.streak.number}/>
      </div>
      <div className="flex w-full gap-2 mt-4 pb-2 border-b-2 border-[#DEDEDE]">
        <MoodOfTheWeek />
        <SubjectStreak/>
      </div>
      <div className="flex gap-2 pt-1 mb-3">

        <DailyReport dailyreportquiz={studentData.details.report.dailyReport.quiz} 
        dailyreportsession={studentData.details.report.dailyReport.session}/>

        <SubjectProgress userSubjects={studentData.academic.subjects}/>
      </div>
      <ProgressAnalytics />
    </div>
    
    <div className="bg-[] py-2 lg:px-4 lg:hidden lg:rounded-tr-2xl w-full">
    <div className="bg-[#E8DAFE75] shadow-custom-combined lg:rounded-t-2xl flex px-3 md:px-7 pt-6 pb-2 justify-between">
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
    <div className="mx-[24px]">
    <div className="flex flex-col w-full gap-[8px] mt-4 pb-2 lg:border-b-2 border-[#DEDEDE]">
      <MoodOfTheWeek />
      <SubjectStreak />
    </div>
    <div className="flex flex-col pt-[8px] gap-[8px] mb-3">
      <DailyReport />
      <SubjectProgress userSubjects={studentData.academic.subjects}/>
    </div>
    <ProgressAnalytics />
    </div>
    
  </div>
  </>
    
  );
}
