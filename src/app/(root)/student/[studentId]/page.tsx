"use client"
import { Params } from "@/helpers/types";
import CommunicationPanel from "./components/CommunicationPanel";
import StudentDashboard from "./components/StudentDashboard";
import { ReactElement } from "react";
import { getMeetings } from "@/actions/meeting_actions";


export default async function StudentPage({ params: { studentId } }: Params) {
  const meetingsData = await getMeetings(studentId)
  return (
    <>
    <div className="mx-[1px] overflow-auto lg:flex hidden gap-5 h-[calc(100dvh-120px)]">
      <StudentDashboard studentId={studentId} />
      <CommunicationPanel meetings={meetingsData.meetings} />
      
    </div>
    <div className="mx-[1px] overflow-auto flex h-[calc(100dvh-160px)] lg:hidden">
      <StudentDashboard studentId={studentId} />
    </div></>
    
  )
}
StudentPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};