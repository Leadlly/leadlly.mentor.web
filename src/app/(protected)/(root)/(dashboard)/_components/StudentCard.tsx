import { useMemo } from "react";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { getBackgroundColor } from "@/helpers/constants/efficiency";
import { Studentinformation } from "@/helpers/types";
import { formatDate } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import { formatClassLabel } from "@/helpers/constants/academic";

const StudentCard = ({
  studentInfo,
  canSelectStudents,
  setStudentIds,
  studentIds,
}: {
  studentInfo: Studentinformation;
  canSelectStudents: boolean;
  studentIds: string[];
  setStudentIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const cardBackgroundColor = useMemo(
    () =>
      getBackgroundColor(
        studentInfo.details.report.dailyReport.date &&
          formatDate(new Date(studentInfo.details.report.dailyReport.date)) ===
            formatDate(new Date(Date.now()))
          ? studentInfo.details.report.dailyReport.overall
          : 0
      ),
    [
      studentInfo.details.report.dailyReport.date,
      studentInfo.details.report.dailyReport.overall,
    ]
  );

  const handleOnSelectStudent = (studentId: string) => {
    setStudentIds((prevIds: string[]) => {
      if (prevIds.includes(studentId)) {
        return prevIds.filter((id) => id !== studentId);
      } else {
        return [...prevIds, studentId];
      }
    });
  };

  return (
    <div className="relative">
      {canSelectStudents && (
        <Checkbox
          checked={studentIds?.includes(studentInfo._id)}
          onCheckedChange={() => handleOnSelectStudent(studentInfo._id)}
          className="absolute top-2 left-3 w-4 h-4 border-white cursor-pointer rounded-sm checked:bg-primary checked:hover:bg-primary checked:focus:bg-primary focus:ring-primary"
        />
      )}
      <Link href={`/student/${studentInfo._id}`}>
        <div
          className={cn(
            "bg-slate-500 rounded-2xl justify-center flex p-1 px-2 flex-col items-center",
            cardBackgroundColor
          )}
        >
          <div className="flex flex-col  border-b-2 pb-2 border-[#00AF9661] w-full justify-center items-center">
            <div className="flex flex-col mt-[10px] items-center">
              <Avatar className="size-8 md:size-11">
                <AvatarImage
                  src={studentInfo?.avatar?.url}
                  alt={`${studentInfo.firstname}'s avatar`}
                />
                <AvatarFallback>
                  <span className="capitalize text-base font-medium">
                    {studentInfo.firstname.charAt(0)}
                  </span>
                  <span className="capitalize text-base font-medium">
                    {studentInfo.lastname ? studentInfo.lastname.charAt(0) : ""}
                  </span>
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="font-semibold md:text-base text-[10px]">
              {studentInfo.firstname}
            </div>
            <div className="text-[#504F4F] md:text-base text-[10px] font-medium">
              {formatClassLabel(studentInfo.academic.standard)}
            </div>
            <div className="font-semibold md:mb-0 mb-[2%] md:text-base text-[8px] text-[#464646]">
              Level-
              <span className="font-bold text-[#0075FF]">
                {studentInfo.details.level.number
                  ? studentInfo.details.level.number
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StudentCard;
