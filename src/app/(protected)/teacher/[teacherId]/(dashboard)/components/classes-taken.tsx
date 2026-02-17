"use client";

import React from "react";

import { useParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getTeacherReport } from "@/actions/user_actions";
import { cn } from "@/lib/utils";

const ClassesTaken = () => {
  const { teacherId } = useParams<{ teacherId: string }>();

  const { data: report } = useSuspenseQuery({
    queryKey: ["teacher-report", teacherId],
    queryFn: getTeacherReport,
  });

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-semibold">Classes Taken</h3>

      <div className="border border-input rounded-md p-3">
        <div>
          <p className="text-lg font-medium">Total Classes</p>

          <div className="flex items-end justify-between">
            <p className="text-4xl text-primary font-semibold">
              {report.overall.totalClasses ?? 0}
            </p>

            <div className="flex items-end gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 9,
                    height:
                      i === 0 ? 32 : i === 1 ? 45 : i === 2 || i === 3 ? 18 : 0,
                    borderWidth: 1,
                    borderRadius: 999,
                    borderColor:
                      i === 0
                        ? "#E99218"
                        : i === 1
                          ? "#1C72D6"
                          : i === 2
                            ? "#AB75F6"
                            : "#AB75F6",
                    backgroundColor:
                      i === 0
                        ? "#FFEEDD"
                        : i === 1
                          ? "#C5E0FF"
                          : i === 2
                            ? "#E7FCE9"
                            : "#FFE3FF",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-lg font-medium">Batch Wise</p>

          <div className="flex items-center gap-2 w-full overflow-x-auto py-2">
            {report.batchWise.map((batch) => (
              <div
                key={batch.batchId}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-md",
                  batch.batchName === "sigma"
                    ? "bg-[#FFEEDD]"
                    : batch.batchName === "delta"
                      ? "bg-[#C5E0FF]"
                      : batch.batchName === "gamma"
                        ? "bg-[#E7FCE9]"
                        : "bg-primary/10"
                )}
              >
                <p className="capitalize font-medium text-xs">
                  {batch.batchName}
                </p>
                <p
                  className={cn(
                    "font-semibold text-xl",
                    batch.batchName === "sigma"
                      ? "text-[#FFA35D]"
                      : batch.batchName === "delta"
                        ? "text-[#1C72D6]"
                        : batch.batchName === "gamma"
                          ? "text-[#1BAE59]"
                          : "text-primary"
                  )}
                >
                  {batch.classStats.totalClasses}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesTaken;
