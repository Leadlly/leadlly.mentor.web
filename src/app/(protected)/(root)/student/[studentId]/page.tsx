import { ReactElement } from "react";

import { Studentinfo } from "@/actions/user_actions";

import CommunicationPanel from "./components/CommunicationPanel";
import StudentDashboard from "./components/StudentDashboard";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;
  const student = await Studentinfo(studentId);

  return (
    <>
      <div className="mx-px overflow-auto flex flex-col h-auto xl:flex-row gap-5 xl:h-[calc(100dvh-80px)] pb-20 md:pb-10 xl:pb-0 custom__scrollbar px-4">
        <StudentDashboard studentId={studentId} studentData={student.student} />
        <CommunicationPanel studentId={studentId} />
      </div>
    </>
  );
}
StudentPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
