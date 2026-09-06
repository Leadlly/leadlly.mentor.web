"use client";

import React, { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getChapterPlanSheet } from "@/actions/chapter_plan_actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChapterSheetStatus } from "@/helpers/types/chapter-plan";

const statusStyles: Record<ChapterSheetStatus, string> = {
  not_started: "bg-gray-100 text-gray-500",
  running: "bg-amber-50 text-amber-700",
  completed: "bg-emerald-50 text-emerald-700",
};

const statusLabels: Record<ChapterSheetStatus, string> = {
  not_started: "Not started",
  running: "Running",
  completed: "Completed",
};

function asChapterStatus(value: unknown): ChapterSheetStatus {
  const raw = String(value || "").toLowerCase();
  if (raw === "completed" || raw === "done" || raw === "finished") return "completed";
  if (raw === "running") return "running";
  return "not_started";
}

export function BatchCoursePlanner({
  batchId,
  batchName,
  standard,
  subjects,
}: {
  batchId: string;
  batchName?: string;
  standard?: string;
  subjects?: string[];
}) {
  const subjectOptions = useMemo(
    () => (subjects || []).filter(Boolean),
    [subjects]
  );
  const [subject, setSubject] = useState(subjectOptions[0] || "");

  const { data: sheet, isFetching } = useQuery({
    queryKey: ["chapter-plan-sheet", batchId, subject],
    queryFn: () => getChapterPlanSheet(batchId, subject),
    enabled: Boolean(batchId && subject),
  });

  const rows = (sheet?.rows || []).map((row) => ({
    ...row,
    chapterStatus: asChapterStatus(row.chapterStatus || row.sheetStatus),
  }));
  const weeklyLoad = sheet?.weeklyLectureLoad ?? 5;
  const session = sheet?.academicSession || "—";
  const completionDate = sheet?.courseCompletionDate
    ? dayjs(sheet.courseCompletionDate).format("DD MMMM YYYY")
    : "—";
  const totalLectures = sheet?.totalLecturesRequired
    ?? rows.reduce((sum, row) => sum + (Number(row.plannedLectureCount) || 0), 0);

  return (
    <div className="space-y-4">
      {subjectOptions.length > 1 ? (
        <div className="max-w-sm">
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="h-10 bg-white">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjectOptions.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}

      {!subject ? (
        <div className="rounded-2xl border border-dashed border-[#E9D5FF] bg-[#FAF5FF]/40 p-10 text-center text-gray-500">
          This batch has no subjects yet.
        </div>
      ) : isFetching && !rows.length ? (
        <div className="py-10 text-center text-gray-400">Loading course planner...</div>
      ) : sheet && !sheet.success ? (
        <div className="rounded-2xl border border-dashed border-red-200 bg-red-50/40 p-10 text-center text-red-600">
          {sheet.message || "Could not load the course planner"}
        </div>
      ) : !rows.length ? (
        <div className="rounded-2xl border border-dashed border-[#E9D5FF] bg-[#FAF5FF]/40 p-10 text-center text-gray-500">
          No course planner has been published for {subject} yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#E9D5FF] bg-white shadow-sm">
          <div className="bg-[#FAF5FF] px-5 py-5 text-center border-b border-[#E9D5FF]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A855F7]">
              Course planner
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Academic session <span className="font-semibold text-gray-800">{session}</span>
            </p>
            <h2 className="mt-3 text-lg md:text-xl font-bold text-gray-900">
              {subject.toUpperCase()}
              {standard ? ` · ${standard}` : ""}
              {batchName ? ` · ${batchName}` : ""}
              {weeklyLoad ? ` · (${weeklyLoad} L/W)` : ""}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-5 py-4 border-b text-sm">
            <div>
              <p className="text-xs font-medium text-gray-500">No. of lectures / week</p>
              <p className="mt-1 font-semibold text-gray-900">{weeklyLoad} L/W</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">
                Syllabus end / course completion date
              </p>
              <p className="mt-1 font-semibold text-gray-900">{completionDate}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="p-3 w-16">Sl no</th>
                  <th className="p-3">Topic name / sequence</th>
                  <th className="p-3 w-36">No of lectures</th>
                  <th className="p-3 w-44">Topic start date</th>
                  <th className="p-3 w-36">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.chapterId} className="border-t">
                    <td className="p-3 font-semibold text-[#A855F7]">{index + 1}</td>
                    <td className="p-3 font-medium text-gray-900">{row.topicName}</td>
                    <td className="p-3 font-medium text-gray-900">
                      {row.plannedLectureCount || "—"}
                    </td>
                    <td className="p-3 text-gray-800">
                      {row.expectedStartDate
                        ? dayjs(row.expectedStartDate).format("DD MMM YYYY")
                        : "—"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.chapterStatus]}`}
                      >
                        {statusLabels[row.chapterStatus]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t bg-gray-50 px-5 py-4 text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-semibold">Total no. of lectures required:</span>{" "}
              {totalLectures}
            </p>
            <p className="text-gray-500">Course completion date: {completionDate}</p>
          </div>
        </div>
      )}
    </div>
  );
}
