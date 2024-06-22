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
    <div>
      <ul className="flex items-center mb-[0.5%] justify-around md:justify-around gap-2 md:gap-[5px] md:mt-1">
        {quizzesTabs.map((tab) => (
          <Link
            key={tab.id}
            href={`/student/${studentId}/quizzes?quiz=${tab.label}`}
          >
            <li
              className={cn(
                "capitalize px-5 md:px-[3px] py-1 rounded-lg md:rounded-[3px] text-base md:text-[24px] leading-none font-semibold transition ease-in-out duration-300",
                activeTab === tab.id
                  ? "text-[#9654F4] underline-offset-8 underline  decoration-4"
                  : " text-black"
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
