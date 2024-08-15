import { Params } from "@/helpers/types";
import CommunicationPanel from "./components/CommunicationPanel";
import StudentDashboard from "./components/StudentDashboard";
import { ReactElement } from "react";
import { getMeetings } from "@/actions/meeting_actions";
import { getUser, Studentinfo } from "@/actions/user_actions";
import { getChat } from "@/actions/chat_action";

export default async function StudentPage({ params: { studentId } }: Params) {
  const studentDataPromise = Studentinfo(studentId);
  const mentorPromise = getUser(); 

  const [studentInfo, mentor] = await Promise.all([studentDataPromise, mentorPromise]);

  const chatDataPromise = getChat({
    mentorId: mentor.user._id,
    studentId: studentId,
  });

  const chatData = await chatDataPromise;

  return (
    <>
      <div className="mx-[1px] overflow-auto lg:flex hidden gap-5 h-[calc(100dvh-120px)]">
        <StudentDashboard studentId={studentId} studentData={studentInfo.student} />
        <CommunicationPanel student={studentInfo.student} chatData={chatData}/>
      </div>
      <div className="mx-[1px] overflow-auto flex h-[calc(100dvh-160px)] lg:hidden">
        <CommunicationPanel student={studentInfo.student} chatData={chatData} />
      </div>
    </>
  );
}

StudentPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
