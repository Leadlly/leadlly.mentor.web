import React from "react";

import { NotepadText } from "lucide-react";

import { getplanner } from "@/actions/user_actions";

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
  const data = await getplanner({ studentId, startDate, endDate });

  return (
    <>
      {data && data.data && data.data.days ? (
        <Plannercontent weekstopic={data.data.days} />
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
