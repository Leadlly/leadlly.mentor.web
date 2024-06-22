import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CommunicationPanel from "./components/CommunicationPanel";
import StudentDashboard from "./components/StudentDashboard";


export default function StudentPage({ params: { studentId } }: Params) {
  return (
    <div className="mx-[1px] overflow-auto flex gap-5 h-[calc(100dvh-120px)]">
      <StudentDashboard studentId={studentId} />
      <CommunicationPanel />
    </div>
  );
}
