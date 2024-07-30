import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
// import { Student } from "@/helpers/types";
import { getAllStudents } from "@/actions/user_actions";
import Loader from "@/components/shared/Loader";
import { Studentinformation } from "@/helpers/types";

const Students: React.FC = () => {
  const [students, setStudents] = useState<Studentinformation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
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

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 h-[calc(100dvh-120px)] grid-cols-3 lg:gap-[30px] md:gap-[20px] gap-[10px]">
      {students.map((student) => (
        <StudentCard key={student._id} studentInfo={student} />
      ))}
    </div>
  );
};

export default Students;
