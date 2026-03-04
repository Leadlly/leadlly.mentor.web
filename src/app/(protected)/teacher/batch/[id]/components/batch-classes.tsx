"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBatchClasses } from "@/actions/batch_actions";
import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import dayjs from "dayjs";

const BatchClasses = ({ batchId }: { batchId: string }) => {
  const { data: classes, isLoading } = useQuery({
    queryKey: ["batch-classes", batchId],
    queryFn: () => getBatchClasses(batchId),
  });

  if (isLoading) return <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-20 bg-gray-50 rounded-2xl animate-pulse"></div>)}</div>;
  if (!classes || classes.length === 0) return <div className="text-gray-500 text-center py-10">No classes scheduled for this batch yet.</div>;

  return (
    <div className="space-y-4">
      {classes.map((cls: any) => (
        <Link 
          key={cls._id} 
          href={`/teacher/classes/${cls._id}`}
          className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-6">
            <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-600 transition-colors">
              <Calendar className="text-purple-600 group-hover:text-white size-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-lg text-gray-900">{cls.subject}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  {dayjs(cls.date).format("DD MMM, YYYY")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {cls.startTime} - {cls.endTime}
                </span>
              </div>
            </div>
          </div>
          <ChevronRight className="text-gray-400 group-hover:text-purple-600 transition-colors size-6" />
        </Link>
      ))}
    </div>
  );
};

export default BatchClasses;
