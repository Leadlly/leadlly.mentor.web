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
    if (pathname === `/teacher/${user?._id}`)
      return `Hey ${user?.firstname} 👋`;
    if (pathname === `/teacher/${user?._id}/classes`) return "Your Classes";
    if (pathname === `/teacher/${user?._id}/add-classes`)
      return "Manage Classes";
  }, [pathname, user?._id]);

  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <SidebarSeparator orientation="vertical" className="h-5 w-px" />

        <p className="text-2xl font-semibold">{getHeading()}</p>
      </div>

      <Notifications />
    </div>
  );
};

export default MainHeader;
