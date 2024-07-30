import { Studentinfo } from "@/actions/user_actions";
import Tracker from "./_components/Trackerpage";
import React from "react";

const page = async ({
  params: { studentId },
}: {
  params: { studentId: string };
}) => {
  const studentInfo = await Studentinfo(studentId);

  return (
    <div>
      <Tracker
        studentId={studentId}
        studentSubjects={studentInfo.student.academic.subjects}
      />
    </div>
  );
};

export default page;
