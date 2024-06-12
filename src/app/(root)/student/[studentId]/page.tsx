import CommunicationPanel from "./components/CommunicationPanel";
import StudentDashboard from "./components/StudentDashboard";

type Params = {
  params: {
    studentId: string;
  };
};
export default function StudentPage({ params: { studentId } }: Params) {
  return (
    <div className="mx-[1px] overflow-auto flex gap-5 h-[calc(100dvh-120px)]">
      <StudentDashboard />
      <CommunicationPanel />
    </div>
  );
}
