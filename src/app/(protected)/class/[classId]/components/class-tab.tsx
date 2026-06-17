"use client";

import React from "react";

import Link from "next/link";
import {
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";

const ClassTab = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const classId = params.classId as string;

  const tabs = [
    { name: "Report", href: `/class/${classId}/report` },
    { name: "Students", href: `/class/${classId}/students` },
    { name: "Add work", href: `/class/${classId}/add-work` },
  ];

  return (
    <div className="flex border-b border-gray-100 mb-4 md:mb-8 gap-2 md:gap-8 bg-white overflow-x-auto scrollbar-hide pb-2 md:pb-0">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={{
              pathname: tab.href,
              query: searchParams.toString(),
            }}
            className={`min-h-11 px-4 py-3 md:min-h-0 md:px-0 md:pb-4 md:pt-0 text-sm md:text-[15px] font-bold transition-all relative whitespace-nowrap shrink-0 rounded-full md:rounded-none ${
              isActive
                ? "text-[#A855F7] bg-purple-50 md:bg-transparent"
                : "text-gray-500 hover:text-gray-700 bg-gray-50 md:bg-transparent"
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
