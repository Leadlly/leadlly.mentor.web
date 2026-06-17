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
    <div className="flex justify-between md:justify-start border-b border-gray-100 mb-4 md:mb-8 gap-2 md:gap-8 bg-white pb-2 md:pb-0">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Link
            key={tab.name}
            href={{
              pathname: tab.href,
              query: searchParams.toString(),
            }}
            className={`min-h-11 flex-1 px-3 py-3 text-center md:min-h-0 md:flex-none md:px-0 md:pb-4 md:pt-0 text-sm md:text-[15px] font-bold transition-all relative whitespace-nowrap rounded-full md:rounded-none ${
              isActive
                ? "text-[#A855F7] bg-purple-50 md:bg-transparent"
                : "text-gray-500 hover:text-gray-700 bg-gray-50 md:bg-transparent"
            }`}
          >
            {tab.name}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 hidden h-1 bg-[#A855F7] rounded-t-full md:block" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default ClassTab;
