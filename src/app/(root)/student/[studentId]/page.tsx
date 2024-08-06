import { Params } from "@/helpers/types";
import CommunicationPanel from "./components/CommunicationPanel";
import StudentDashboard from "./components/StudentDashboard";
import { ReactElement } from "react";
import { getMeetings } from "@/actions/meeting_actions";
import { Studentinfo } from "@/actions/user_actions";

export default async function StudentPage({ params: { studentId } }: Params) {
  const meetingsData = getMeetings(studentId,"");
  const doneMeetingsData = getMeetings(studentId,"done");
  const createdbymentor = getMeetings(studentId,"","mentor");
  const studentData = Studentinfo(studentId);

  const [meetings, mentorMeetings , doneMeeting , student] = await Promise.all([meetingsData, doneMeetingsData, createdbymentor, studentData]);
  console.log(mentorMeetings,"mentor meetings")
  return (
    <>
      <div className="mx-[1px] overflow-auto lg:flex hidden gap-5 h-[calc(100dvh-120px)]">
        <StudentDashboard studentId={studentId} studentData={student.student} />
        <CommunicationPanel mentorMeetings={mentorMeetings.meetings} doneMeeting={doneMeeting.meetings} meetings={meetings.meetings} studentId={studentId} />
      </div>
      <div className="mx-[1px] overflow-auto flex h-[calc(100dvh-160px)] lg:hidden">
        <StudentDashboard studentId={studentId} studentData={student.student} />
      </div>
    </>
  );
}
StudentPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
