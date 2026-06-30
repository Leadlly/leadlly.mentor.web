import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MeetingCardSkeleton = () => {
  return (
    <div className="py-3 p-1 w-full">
      <div className="bg-[#f3eaff]/50 p-6 rounded-2xl mb-4 shadow-[0px_4px_4px_0px_#00000010]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-[30px] h-[30px] rounded-[8px]" />
            <Skeleton className="w-[100px] h-[20px]" />
          </div>
          <Skeleton className="w-[120px] h-[20px]" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-[30px] h-[30px] rounded-[8px]" />
            <Skeleton className="w-[40px] h-[20px]" />
          </div>
          <Skeleton className="w-[80px] h-[20px]" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-[30px] h-[30px] rounded-[8px]" />
            <Skeleton className="w-[40px] h-[20px]" />
          </div>
          <Skeleton className="w-[150px] h-[20px]" />
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-[70px] h-[32px] rounded-md" />
          <Skeleton className="w-[90px] h-[32px] rounded-md" />
        </div>
        <Skeleton className="w-[100px] h-[32px] rounded-md" />
      </div>
    </div>
  );
};

export default MeetingCardSkeleton;
