import { Params } from "@/helpers/types";
import CommunicationPanel from "./components/CommunicationPanel";
import StudentDashboard from "./components/StudentDashboard";
import { ReactElement } from "react";
import { getMeetings } from "@/actions/meeting_actions";
import { Studentinfo } from "@/actions/user_actions";

export default async function StudentPage({ params: { studentId } }: Params) {
  const meetingsData = getMeetings(studentId);
  const studentData = Studentinfo(studentId);

  const [meetings, student] = await Promise.all([meetingsData, studentData]);
  return (
    <>
      <div className="mx-[1px] overflow-auto lg:flex hidden gap-5 h-[calc(100dvh-120px)]">
        <StudentDashboard studentId={studentId} studentData={student.student} />
        <CommunicationPanel meetings={meetings.meetings} studentId={studentId} />
      </div>
      <div className="mx-[1px] overflow-auto flex h-[calc(100dvh-160px)] lg:hidden">
        {/* <StudentDashboard studentId={studentId} studentData={student.student} /> */}
        <CommunicationPanel meetings={meetings.meetings} studentId={studentId} />

      </div>
    </>
  );
}
StudentPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
