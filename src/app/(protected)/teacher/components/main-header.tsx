"use client";

import React, { useCallback } from "react";

import { usePathname } from "next/navigation";

import { SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";

import Notifications from "./notifications";

const MainHeader = () => {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.user);

  const getHeading = useCallback(() => {
    if (pathname === "/teacher") return `Hey ${user?.firstname ?? ""}`;
    if (pathname.startsWith("/teacher/classes")) return "Classes";
    if (pathname.startsWith("/teacher/batches")) return "Batches";
    if (pathname.startsWith("/teacher/students")) return "Students";
    if (pathname.startsWith("/class/")) return "Class";
    return "";
  }, [pathname, user?.firstname]);

  return (
    <div className="flex items-center justify-between px-3 md:px-4 py-2.5 sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-50">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hidden md:flex" />
        <SidebarSeparator orientation="vertical" className="h-5 w-px hidden md:block" />
        <p className="text-lg md:text-2xl font-bold text-gray-900">{getHeading()}</p>
      </div>

      <Notifications />
    </div>
  );
};

export default MainHeader;
