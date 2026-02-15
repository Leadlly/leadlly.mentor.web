"use client";
import { quizzesTabs } from "@/helpers/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const QuizzTab = ({
  activeTab,
  studentId,
}: {
  activeTab: string | string[];
  studentId: string;
}) => {
  return (
    <div >
      <ul className="flex items-center mb-[0.5%] w-full justify-around gap-2 md:gap-[5px] md:mt-1">
        {quizzesTabs.map((tab) => (
          <Link
            key={tab.id}
            href={`/student/${studentId}/quizzes?quiz=${tab.label}`}
          >
            <li
              className={cn(
                "capitalize py-2  px-5 md:py-1  rounded-lg text-base font-semibold transition ease-in-out duration-300",
                "md:px-[3px] md:rounded-[3px] md:text-[24px]",
                activeTab === tab.id
                  ? "text-[#9654F4] underline-offset-[10px] md:underline-offset-8 underline decoration-4"
                  : "text-black"
              )}
            >
              {tab.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default QuizzTab;
