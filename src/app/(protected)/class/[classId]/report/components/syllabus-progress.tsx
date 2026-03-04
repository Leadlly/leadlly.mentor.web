"use client";

import React from "react";

import { Progress } from "@/components/ui/progress";

interface SyllabusProgressProps {
  syllabusCompletion: number;
  chapterCompletion: number;
}

const SyllabusProgress = ({
  syllabusCompletion,
  chapterCompletion,
}: SyllabusProgressProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="space-y-6">
        {/* Syllabus Completed */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Syllabus Completed
            </span>
            <span className="text-lg font-bold text-gray-900">
              {syllabusCompletion}%
            </span>
          </div>
          <Progress
            value={syllabusCompletion}
            className="h-3 bg-gray-100"
            indicatorClassName="bg-[#7F00FF]" // Violet from image
          />
        </div>

        {/* Chapter Completed */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Chapter Completed
            </span>
            <span className="text-lg font-bold text-gray-900">
              {chapterCompletion}%
            </span>
          </div>
          <Progress
            value={chapterCompletion}
            className="h-3 bg-gray-100"
            indicatorClassName="bg-[#40E0D0]" // Teal/Turquoise from image
          />
        </div>
      </div>
    </div>
  );
};

export default SyllabusProgress;
