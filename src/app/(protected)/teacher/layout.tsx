import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import AppSidebar from "./components/app-sidebar";
import MainHeader from "./components/main-header";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1">
        <MainHeader />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default TeacherLayout;
