import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
// import { Student } from "@/helpers/types"; 
import { getAllStudents } from "@/actions/user_actions";

const Students: React.FC = () => {
  const [students, setStudents] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        console.log(data); 
        setStudents(data.students);
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
      {students.map((student: any) => (
        <StudentCard
          mood="neutral"
          avatar={student.avatar?.url}
          efficiency={70}
          level="6"
          messages="No message"
          name={student.firstname}
          progress={50}
          studentClass={student?.academic?.standard}
          key={student._id}
          id={student._id}
        />
      ))}
    </div>
  );
};

export default Students;
