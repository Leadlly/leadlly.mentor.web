"use client"

import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
// import { Student } from "@/helpers/types";
import { getAllStudents } from "@/actions/user_actions";
import Loader from "@/components/shared/Loader";
import { Studentinformation } from "@/helpers/types";
import { useSocket } from "@/contexts/socket/socketProvider";

const Students = ({
  canSelectStudents,
  setCanSelectStudents,
  setStudentIds,
  studentIds,
  students,
}: {
  canSelectStudents: boolean;
  setCanSelectStudents: (canSelectStudents: boolean) => void;
  students: Studentinformation[];
  studentIds: string[];
  setStudentIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {

  const {socket} = useSocket()

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 h-[calc(100dvh-120px)] grid-cols-3 lg:gap-[30px] md:gap-[20px] gap-[10px]">
      {students.map((student) => (
        <StudentCard
          key={student._id}
          studentInfo={student}
          setStudentIds={setStudentIds}
          studentIds={studentIds}
          canSelectStudents={canSelectStudents}
          socket={socket}
        />
      ))}
    </div>
  );
};

export default Students;
