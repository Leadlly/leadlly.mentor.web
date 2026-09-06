"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getChapterPlanByClass } from "@/actions/chapter_plan_actions";

const ChapterPlanView = ({ classId }: { classId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chapter-plan", classId],
    queryFn: () => getChapterPlanByClass(classId),
  });

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-400 animate-pulse">
        Loading chapter plan...
      </div>
    );
  }

  const plan = data?.plan;
  const chapters = [...(plan?.chapters || [])].sort(
    (a, b) => a.sequenceOrder - b.sequenceOrder
  );
  const subject = data?.class?.subject || plan?.subject;
  const batchName =
    data?.class?.batch?.name ||
    (typeof plan?.batch === "object" ? plan.batch.name : "");

  if (!plan) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <div className="rounded-[28px] border border-dashed border-[#E9D5FF] bg-[#FAF5FF]/50 px-8 py-14 text-center">
          <p className="text-lg font-semibold text-gray-800">No chapter plan yet</p>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Your institute admin has not published a chapter sequence for{" "}
            {subject || "this subject"}. Keep logging Today&apos;s Work as usual.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="rounded-[28px] bg-gradient-to-br from-[#FAF5FF] to-white border border-[#F2E0FF] p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A855F7]">
          Admin chapter plan
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
          {subject}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {batchName ? `${batchName} · ` : ""}
          {chapters.length} chapter{chapters.length === 1 ? "" : "s"} · read only
        </p>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.chapterId}
            className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 md:p-5 shadow-sm"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FAF5FF] text-sm font-bold text-[#A855F7]">
              {chapter.sequenceOrder || index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-gray-900 leading-snug">
                {chapter.chapterName}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium">
                <span className="rounded-full bg-gray-50 px-3 py-1 text-gray-600">
                  {chapter.plannedLectureCount} lecture
                  {chapter.plannedLectureCount === 1 ? "" : "s"} required
                </span>
                <span className="rounded-full bg-gray-50 px-3 py-1 text-gray-600">
                  Start {dayjs(chapter.expectedStartDate).format("DD MMM YYYY")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterPlanView;
