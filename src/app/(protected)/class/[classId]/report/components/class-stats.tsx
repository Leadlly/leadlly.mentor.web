"use client";

import React from "react";

interface ClassStatsProps {
  totalClasses: number;
  totalTimeHours: number;
}

const ClassStats = ({ totalClasses, totalTimeHours }: ClassStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Total Class Card */}
      <div className="bg-[#EBE3FF] rounded-2xl p-6 flex flex-col items-center justify-center text-center h-32">
        <span className="text-sm font-medium text-gray-600 mb-1">
          Total Class
        </span>
        <span className="text-3xl font-bold text-[#9747FF]">
          {totalClasses}
        </span>
      </div>

      {/* Total Time Card */}
      <div className="bg-[#EBE3FF] rounded-2xl p-6 flex flex-col items-center justify-center text-center h-32">
        <span className="text-sm font-medium text-gray-600 mb-1">
          Total Time
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[#9747FF]">
            {totalTimeHours}
          </span>
          <span className="text-sm font-medium text-[#9747FF]">hr</span>
        </div>
      </div>
    </div>
  );
};

export default ClassStats;
