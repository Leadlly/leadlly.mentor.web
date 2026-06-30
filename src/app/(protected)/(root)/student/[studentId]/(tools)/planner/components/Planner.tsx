import React from "react";

import { NotepadText } from "lucide-react";

import { getplanner, Studentinfo } from "@/actions/user_actions";

import Plannercontent from "./Plannercontent";

const Planner = async ({
  studentId,
  startDate,
  endDate,
}: {
  studentId: string;
  startDate?: string;
  endDate?: string;
}) => {
  const [data, studentData] = await Promise.all([
    getplanner({ studentId, startDate, endDate }),
    Studentinfo(studentId),
  ]);

  return (
    <>
      {data && data.data && data.data.days ? (
        <Plannercontent
          weekstopic={data.data.days}
          studentSubjects={studentData?.student?.academic?.subjects || []}
          studentStandard={studentData?.student?.academic?.standard}
          studentCompetitiveExam={
            studentData?.student?.academic?.competitiveExam
          }
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-base md:text-lg text-secondary-foreground/60 font-medium">
          <NotepadText size={40} className="mb-[10px]" />
          <p>No planner exists for current period</p>
        </div>
      )}
    </>
  );
};

export default Planner;
