"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../../teacher/components/app-sidebar";
import MainHeader from "../../teacher/components/main-header";
import MobileBottomNav from "../../teacher/components/mobile-bottom-nav";
import ClassTab from "./components/class-tab";

const ClassLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 min-w-0 min-h-screen bg-[#FAFAFA] flex flex-col">
        <MainHeader />

        <div className="flex-1 w-full bg-white rounded-t-[24px] md:rounded-t-[40px] shadow-[0_-4px_20px_rgba(0,0,0,0.02)] px-3 md:px-8 py-4 md:py-6 border-t border-gray-100 flex flex-col pb-20 md:pb-6 mt-2">
          <ClassTab />
          <div className="flex-1 w-full bg-white">
            {children}
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </SidebarProvider>
  );
};

export default ClassLayout;
