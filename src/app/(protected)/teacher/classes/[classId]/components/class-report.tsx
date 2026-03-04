"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getClassDetails } from "@/actions/batch_actions";
import { Calendar, Clock, BookOpen, Clock3 } from "lucide-react";
import dayjs from "dayjs";

const ClassReport = ({ classId }: { classId: string }) => {
  const { data: classData, isLoading } = useQuery({
    queryKey: ["class-details", classId],
    queryFn: () => getClassDetails(classId),
  });

  if (isLoading) return <div className="h-64 bg-gray-50 rounded-3xl animate-pulse"></div>;
  if (!classData) return <div className="text-gray-500 text-center py-10">Class not found.</div>;

  const report = classData.classReport || {};
  
  const stats = [
    { label: "Total Lectures", value: report.totalLectures || 0, icon: Presentation },
    { label: "Total Duration", value: `${report.totalDuration || 0} min`, icon: Clock3 },
    { label: "Syllabus", value: `${report.syllabusCompleted || 0}%`, icon: BookOpen },
  ];

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{classData.subject}</h2>
          <p className="text-gray-500 text-lg mt-1">{classData.topic || "General Discussion"}</p>
        </div>
        <div className="flex flex-col items-end gap-2 text-gray-600">
           <div className="flex items-center gap-2">
             <Calendar className="size-5" />
             <span className="font-medium">{dayjs(classData.date).format("dddd, DD MMMM YYYY")}</span>
           </div>
           <div className="flex items-center gap-2">
             <Clock className="size-5" />
             <span className="font-medium">{classData.startTime} - {classData.endTime}</span>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4">
             <div className="bg-purple-50 p-4 rounded-2xl">
                <stat.icon className="text-purple-600 size-8" />
             </div>
             <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest">{stat.label}</p>
                <p className="text-4xl font-black text-gray-900 mt-1">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Description / Notes */}
      {classData.description && (
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{classData.description}</p>
        </div>
      )}
    </div>
  );
};

// Simple Presentation icon fallback since I used it but didn't import it correctly from Lucide if it's named differently
import { Presentation } from "lucide-react";

export default ClassReport;
