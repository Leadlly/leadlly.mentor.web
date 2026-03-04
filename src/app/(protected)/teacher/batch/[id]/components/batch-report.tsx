"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBatchDetails } from "@/actions/batch_actions";

const BatchReport = ({ batchId }: { batchId: string }) => {
  const { data: batch, isLoading } = useQuery({
    queryKey: ["batch-details", batchId],
    queryFn: () => getBatchDetails(batchId),
  });

  if (isLoading) return <div className="h-40 bg-gray-50 rounded-3xl animate-pulse"></div>;
  if (!batch) return null;

  const stats = [
    { label: "Total Classes", value: batch.batchReport?.totalClasses || 0 },
    { label: "Completed", value: batch.batchReport?.completedClasses || 0 },
    { label: "Students", value: batch.batchReport?.totalStudents || 0 },
    { label: "Syllabus", value: `${batch.batchReport?.syllabusProgress || 0}%` },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center space-y-2">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchReport;
