"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import { getClassDetails } from "@/actions/batch_actions";
import { BatchCoursePlanner } from "@/app/(protected)/teacher/batch/[id]/components/batch-course-planner";

const ChapterPlanView = ({ classId }: { classId: string }) => {
  const { data: classDoc, isLoading } = useQuery({
    queryKey: ["class-details", classId],
    queryFn: () => getClassDetails(classId),
  });

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-400 animate-pulse">
        Loading course planner...
      </div>
    );
  }

  const subject = classDoc?.subject;
  const batchId =
    typeof classDoc?.batch === "object" ? classDoc?.batch?._id : classDoc?.batch;
  const batchName =
    typeof classDoc?.batch === "object" ? classDoc?.batch?.name : "";
  const standard =
    typeof classDoc?.batch === "object" ? classDoc?.batch?.standard : classDoc?.standard;

  if (!batchId || !subject) {
    return (
      <div className="rounded-2xl border border-dashed border-[#E9D5FF] bg-[#FAF5FF]/50 px-8 py-14 text-center">
        <p className="text-lg font-semibold text-gray-800">No course planner yet</p>
        <p className="mt-2 text-sm text-gray-500">
          This class is missing a batch or subject.
        </p>
      </div>
    );
  }

  return (
    <BatchCoursePlanner
      batchId={String(batchId)}
      batchName={batchName}
      standard={standard}
      subjects={[subject]}
    />
  );
};

export default ChapterPlanView;
