import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { Student } from "@/helpers/types"; 
import { getAllStudents } from "@/actions/user_actions";

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        console.log(data); 
        setStudents(data);
        setLoading(false);
      } catch (err) {
        console.error((err as Error).message); 
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 h-[calc(100dvh-120px)] grid-cols-3 lg:gap-[30px] md:gap-[20px] gap-[10px]">
      {students.map((student: Student) => (
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
      ))}
    </div>
  );
};

export default Students;
