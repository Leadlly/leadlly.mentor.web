import { Studentinfo } from "@/actions/user_actions";
import Tracker from "./_components/Trackerpage";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) => {
  const { studentId } = await params;
  const studentInfo = await Studentinfo(studentId);

  return (
    <>
      <Tracker
        studentId={studentId}
        studentSubjects={studentInfo.student.academic.subjects}
      />
    </>
  );
};

export default page;
