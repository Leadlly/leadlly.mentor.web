import React from "react";
import StudentCard from "./StudentCard";
import students from "@/temp/students";
import { Student } from "@/helpers/types";

const Students = () => {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 h-[calc(100dvh-120px)]  grid-cols-3 lg:gap-[30px] md:gap-[20px] gap-[10px]">
      {students.map((student: Student) => {
        return (
          <StudentCard
            mood={student.mood}
            avatar={student.avatar}
            efficiency={student.efficiency}
            level={student.level}
            messages={student.messages}
            name={student.name}
            progress={student.progress}
            studentClass={student.studentClass}
            key={student.id}
            id={student.id}
          />
        );
      })}
    </div>
  );
};

export default Students;
