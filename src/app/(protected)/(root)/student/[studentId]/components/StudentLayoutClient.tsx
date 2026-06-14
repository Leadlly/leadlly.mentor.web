import MobileMenu from "@/components/shared/MobileMenu";
import Sidebar from "@/components/shared/Sidebar";

import StudentHeader from "./StudentHeader";

export default function StudentLayoutClient({
  children,
  studentId,
}: {
  children: React.ReactNode;
  studentId: string;
}) {
  return (
    <div className="flex flex-col h-screen">
      <StudentHeader />

      <div className="flex flex-1 min-h-0">
        <div className="no-scrollbar h-full md:block hidden">
          <Sidebar id={studentId} />
        </div>
        <div className="w-full overflow-auto">{children}</div>
      </div>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.1)] overflow-hidden">
        <MobileMenu id={studentId} />
      </div>
    </div>
  );
}
