"use client";

import React, { useCallback } from "react";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getClassDetails } from "@/actions/batch_actions";
import { formatCompetitiveExamLabel } from "@/helpers/constants/academic";
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
  const isClassRoute = pathname.startsWith("/class/");
  const classId = pathname.startsWith("/class/") ? pathname.split("/")[2] : "";
  const classNameFromQuery = searchParams.get("className");
  const { data: classData } = useQuery({
    queryKey: ["class-details", classId],
    queryFn: () => getClassDetails(classId),
    enabled: !!classId,
  });

  const getClassHeading = useCallback(() => {
    if (classData?.batch?.name) return classData.batch.name;
    if (classNameFromQuery?.includes(" - ")) {
      return classNameFromQuery.split(" - ").slice(1).join(" - ");
    }
    return classNameFromQuery || "Class";
  }, [classData, classNameFromQuery]);

  const getClassSubtitle = useCallback(() => {
    const subject = classData?.subject;
    const exam = formatCompetitiveExamLabel(classData?.batch?.competitiveExam);
    return [subject, exam].filter(Boolean).join(" · ");
  }, [classData]);

  const getHeading = useCallback(() => {
    if (pathname === "/teacher") return `Hey ${user?.firstname ?? ""}`;
    if (pathname.startsWith("/teacher/classes")) return "Classes";
    if (pathname.startsWith("/teacher/batches")) return "Batches";
    if (pathname.startsWith("/teacher/students")) return "Attendance";
    if (isClassRoute) return getClassHeading();
    if (pathname.startsWith("/teacher/batch/")) return "Batch";
    return "";
  }, [pathname, user?.firstname, isClassRoute, getClassHeading]);

  const classSubtitle = isClassRoute ? getClassSubtitle() : "";

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
        <div className="min-w-0">
          <p className="text-lg md:text-2xl font-bold text-gray-900 capitalize truncate">
            {getHeading()}
          </p>
          {classSubtitle ? (
            <p className="text-xs md:text-sm text-gray-500 font-medium capitalize truncate mt-0.5">
              {classSubtitle}
            </p>
          ) : null}
        </div>
      </div>

      <Notifications />
    </div>
  );
};

export default MainHeader;
