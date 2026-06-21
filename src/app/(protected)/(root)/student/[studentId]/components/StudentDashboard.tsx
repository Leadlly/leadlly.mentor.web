import React from "react";

import Link from "next/link";

import Loader from "@/components/shared/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Studentinformation } from "@/helpers/types";
import { formatDate } from "@/helpers/utils";

// import SubjectStreak from "./TotalStreak";
import DailyReport from "./DailyReport";
import MoodOfTheWeek from "./MoodOfTheWeek";
import PointsBox from "./Pointsbox";
import ProgressAnalytics from "./ProgressAnalytics";
import SubjectProgress from "./SubjectProgress";

export default function StudentDashboard({
  studentId,
  studentData,
}: {
  studentId: string;
  studentData: Studentinformation;
}) {
  return (
    <>
      <div className="bg-[#E8E3F063] overflow-y-auto custom__scrollbar p-4 border-[#DDDDDD] border rounded-2xl w-full flex flex-col gap-3">
        <div className="bg-[#CDAAFF] rounded-xl flex flex-col gap-5 p-5">
          <div className="flex gap-4">
            <Avatar className="size-24">
              <AvatarImage
                src={studentData?.avatar?.url}
                alt={`${studentData.firstname}'s avatar`}
              />
              <AvatarFallback className="text-xl font-medium">
                {studentData.firstname.charAt(0)}
                {studentData.lastname ? studentData.lastname.charAt(0) : ""}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-[#5F5F5F] font-semibold text-2xl capitalize">
                {studentData.firstname}{" "}
                {studentData.lastname ? studentData.lastname : ""}
              </div>
              <div className="text-white font-semibold text-base">
                Class:{studentData.academic.standard}
              </div>
              <Link
                href={`/student-profile/${studentId}`}
                className="bg-white text-xs font-semibold text-[#9654F4] px-[5px] py-1 rounded capitalize"
              >
                view profile
              </Link>
            </div>
          </div>

          <PointsBox
            points={studentData.details.points.number}
            level={studentData.details.level.number}
            streak={studentData.details.streak.number}
          />
        </div>

        <DailyReport
          studentDailyReport={studentData.details.report.dailyReport}
        />

        <ProgressAnalytics studentId={studentId} />

        <SubjectProgress userSubjects={studentData.academic.subjects} />
      </div>
    </>
  );
}
