import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../../teacher/components/app-sidebar";
import MainHeader from "../../teacher/components/main-header";
import ClassTab from "./components/class-tab";

const ClassLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1">
        <MainHeader />
        <div className="p-3 max-w-7xl mx-auto min-h-screen flex flex-col items-start bg-[#FAFAFA] sm:bg-white">
          <ClassTab />
          <div className="flex-1 w-full bg-[#FAFAFA] sm:bg-white">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ClassLayout;
