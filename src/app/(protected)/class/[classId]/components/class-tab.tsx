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
    { name: "Students", href: `/class/${classId}/students` },
    { name: "Add Work", href: `/class/${classId}/add-work` },
  ];

  return (
    <div className="w-full flex flex-col gap-y-4 bg-white sticky top-0 z-10">
      <div className="flex flex-row items-center gap-x-4">
        <Button size={"icon"} variant={"ghost"} onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 capitalize">
          {className}
        </h1>
      </div>

      <div className="flex flex-row items-center w-full border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={{
                pathname: tab.href,
                query: searchParams.toString(), // Preserve query params
              }}
              className="flex-1"
            >
              <div
                className={clsx(
                  "flex items-center justify-center py-3 border-b-2 transition-colors duration-200",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
              >
                <span className="text-sm font-medium">{tab.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ClassTab;
