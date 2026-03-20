"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Sidebar from "@/components/shared/Sidebar";
import MobileMenu from "@/components/shared/MobileMenu";

const StudentHeader = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-3 md:px-4 py-2.5 sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-50">
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center shrink-0"
        >
          <ChevronLeft className="size-5 text-gray-800" strokeWidth={2.5} />
        </button>
        <p className="text-lg md:text-2xl font-bold text-gray-900">Student</p>
      </div>
    </div>
  );
};

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
