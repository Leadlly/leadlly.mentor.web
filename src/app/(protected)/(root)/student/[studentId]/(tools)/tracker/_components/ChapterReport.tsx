"use client";

import React from "react";

import { Progress } from "@/components/ui/progress";
import { calculateProgress } from "@/helpers/constants";
import { TTrackerProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

const ChapterReport = ({ chapterData }: { chapterData: TTrackerProps }) => {
  const overall_efficiency = chapterData.chapter.overall_efficiency || 0;

  return (
    <div>
      <div className="mb-4">
        <p className="font-medium text-secondary-text text-base">
          <span className="font-semibold text-black text-3xl">
            {chapterData.chapter.total_questions_solved.number ?? 0}
          </span>{" "}
          questions solved
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-medium">Revision Accuracy</p>
        <div className="flex gap-x-3 items-center justify-between">
          <Progress
            value={calculateProgress(overall_efficiency!)}
            className={cn(
              "h-3",
              overall_efficiency <= 40
                ? "bg-[#FFF5F4]"
                : overall_efficiency > 40 && overall_efficiency < 80
                  ? "bg-[#FDF6E6]"
                  : "bg-[#EDFBF0]"
            )}
            indicatorClassName={
              overall_efficiency <= 40
                ? "bg-[#E2544A]"
                : overall_efficiency > 40 && overall_efficiency < 80
                  ? "bg-[#F1B022]"
                  : "bg-[#0A9D29]"
            }
          />

          <p className="font-semibold text-2xl">
            {Math.round(overall_efficiency!)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChapterReport;
