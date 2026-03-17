"use client";

import React from "react";

import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import clsx from "clsx";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const ClassTab = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const classId = params.classId as string;
  const className = searchParams.get("className") || "Class";

  const tabs = [
    { name: "Report", href: `/class/${classId}/report` },
    { name: "Announcements", href: `/class/${classId}/announcements` },
    { name: "Add Notes/DPP", href: `/class/${classId}/add-notes` },
    { name: "Add Work", href: `/class/${classId}/add-work` },
  ];

  return (
    <div className="flex border-b border-gray-100 mb-4 md:mb-8 gap-3 md:gap-8 bg-white overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={{
              pathname: tab.href,
              query: searchParams.toString(),
            }}
            className={`pb-3 md:pb-4 text-xs md:text-[15px] font-bold transition-all relative whitespace-nowrap shrink-0 ${
              isActive
                ? "text-[#A855F7]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.name}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A855F7] rounded-t-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default ClassTab;
