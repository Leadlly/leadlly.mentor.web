"use client";

import React, { useCallback } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import { ChevronLeft } from "lucide-react";

import Notifications from "./notifications";

const MainHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAppSelector((state) => state.user);

  const showBackButton = pathname.startsWith("/class/") || pathname.startsWith("/teacher/batch/");

  const getHeading = useCallback(() => {
    if (pathname === "/teacher") return `Hey ${user?.firstname ?? ""}`;
    if (pathname.startsWith("/teacher/classes")) return "Classes";
    if (pathname.startsWith("/teacher/batches")) return "Batches";
    if (pathname.startsWith("/teacher/students")) return "Attendance";
    if (pathname.startsWith("/class/")) {
      return searchParams.get("className") || "Class";
    }
    if (pathname.startsWith("/teacher/batch/")) return "Batch";
    return "";
  }, [pathname, user?.firstname, searchParams]);

  return (
    <div className="flex items-center justify-between px-3 md:px-4 py-2.5 sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-50">
      <div className="flex items-center gap-2 md:gap-3">
        <SidebarTrigger className="hidden md:flex" />
        <SidebarSeparator orientation="vertical" className="h-5 w-px hidden md:block" />
        {showBackButton && (
          <button
            onClick={() => router.back()}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center shrink-0"
          >
            <ChevronLeft className="size-5 text-gray-800" strokeWidth={2.5} />
          </button>
        )}
        <p className="text-lg md:text-2xl font-bold text-gray-900 capitalize truncate">{getHeading()}</p>
      </div>

      <Notifications />
    </div>
  );
};

export default MainHeader;
