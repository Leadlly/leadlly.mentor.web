"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../../teacher/components/app-sidebar";
import MainHeader from "../../teacher/components/main-header";
import ClassTab from "./components/class-tab";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const ClassLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const className = searchParams.get("className") || "Class";

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 min-h-screen bg-[#FAFAFA] flex flex-col">
        <MainHeader />
        
        {/* Header outside */}
        <div className="flex items-center gap-4 px-8 py-6 mb-2">
          <button 
            onClick={() => router.back()} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center shrink-0"
          >
            <ChevronLeft className="size-5 text-gray-800" strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 capitalize tracking-tight">
            {className}
          </h1>
        </div>

        <div className="flex-1 w-full bg-white rounded-t-[40px] shadow-[0_-4px_20px_rgba(0,0,0,0.02)] px-8 py-6 border-t border-gray-100 flex flex-col">
          <ClassTab />
          <div className="flex-1 w-full bg-white">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ClassLayout;
