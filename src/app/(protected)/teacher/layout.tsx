import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import AppSidebar from "./components/app-sidebar";
import MainHeader from "./components/main-header";
import MobileBottomNav from "./components/mobile-bottom-nav";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MainHeader />
        <div className="flex-1 pb-20 md:pb-0">
          {children}
        </div>
      </div>
      <MobileBottomNav />
    </SidebarProvider>
  );
};

export default TeacherLayout;
