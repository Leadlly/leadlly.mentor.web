"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBatchDetails, getBatchClasses } from "@/actions/batch_actions";
import { ChevronLeft, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const BatchDashboard = ({ batchId }: { batchId: string }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("report");

  const { data: batch, isLoading: isBatchLoading } = useQuery({
    queryKey: ["batch-details", batchId],
    queryFn: () => getBatchDetails(batchId),
  });

  const { data: classes, isLoading: isClassesLoading } = useQuery({
    queryKey: ["batch-classes", batchId],
    queryFn: () => getBatchClasses(batchId),
  });

  if (isBatchLoading || isClassesLoading) {
    return <div className="p-6 text-center text-gray-500 animate-pulse">Loading batch data...</div>;
  }

  if (!batch) {
    return <div className="p-6 text-center text-red-500">Batch not found</div>;
  }

  const tabs = [
    { id: "report", label: "Report" },
    { id: "students", label: "Students" },
    { id: "add_work", label: "Add Work" },
  ];

  const syllabusProgress = batch.batchReport?.syllabusProgress || 10;
  const chapterProgress = 5; // Placeholder per screenshot

  const totalClass = batch.batchReport?.totalClasses || 0;
  const totalMinutes = batch.batchReport?.totalDuration || 0;
  const totalHours = Math.floor(totalMinutes / 60);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header outside */}
      <div className="flex items-center gap-4 px-8 py-6 mb-2">
        <button onClick={() => router.push("/teacher/batches")} className="p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center shrink-0">
          <ChevronLeft className="size-5 text-gray-800" strokeWidth={2.5} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 capitalize tracking-tight">{batch.name}</h1>
      </div>

      <div className="flex-1 w-full bg-white rounded-t-[40px] shadow-[0_-4px_20px_rgba(0,0,0,0.02)] px-8 py-6 border-t border-gray-100 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-8 gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-[15px] font-bold transition-all relative ${
                activeTab === tab.id
                  ? "text-[#A855F7]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A855F7] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "report" && (
          <div className="flex flex-col space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="space-y-8 lg:space-y-10">
                {/* Syllabus Section */}
                <div className="space-y-5">
                  <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">Syllabus</h2>
                  <div className="bg-white border border-[#F2E0FF] rounded-[24px] p-6 lg:p-8 space-y-7 shadow-sm">
                    
                    {/* Syllabus Completed */}
                    <div className="space-y-3">
                      <div className="font-bold text-gray-800 text-[15px]">Syllabus Completed</div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#A855F7] rounded-full transition-all duration-500" 
                            style={{ width: `${syllabusProgress}%` }}
                          />
                        </div>
                        <span className="text-gray-900 font-bold w-12 text-right text-base">
                          {syllabusProgress}%
                        </span>
                      </div>
                    </div>

                    {/* Chapter Completed */}
                    <div className="space-y-3">
                      <div className="font-bold text-gray-800 text-[15px]">Chapter Completed</div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#2DD4BF] rounded-full transition-all duration-500" 
                            style={{ width: `${chapterProgress}%` }}
                          />
                        </div>
                        <span className="text-gray-900 font-bold w-12 text-right text-base">
                          {chapterProgress}%
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Classes taken Section */}
                <div className="space-y-5">
                  <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">Classes taken</h2>
                  <div className="grid grid-cols-2 gap-4 lg:gap-6">
                    
                    <div className="bg-[#FAF5FF] rounded-[24px] p-6 flex flex-col items-center justify-center gap-2 lg:gap-3 transition-transform hover:scale-[1.02]">
                      <div className="text-gray-600 font-bold text-[15px]">Total Class</div>
                      <div className="text-[#A855F7] text-4xl lg:text-5xl font-bold">{totalClass}</div>
                    </div>

                    <div className="bg-[#FAF5FF] rounded-[24px] p-6 flex flex-col items-center justify-center gap-2 lg:gap-3 transition-transform hover:scale-[1.02]">
                      <div className="text-gray-600 font-bold text-[15px]">Total Time</div>
                      <div className="text-[#A855F7] text-4xl lg:text-5xl font-bold flex items-baseline gap-1">
                        {totalHours} <span className="text-xl lg:text-2xl font-bold">hr</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                <h2 className="text-[22px] font-bold text-transparent select-none hidden lg:block">Spacer</h2>
                {/* Syllabus Report Box */}
                <div className="bg-white border border-[#F2E0FF] rounded-[24px] p-6 lg:p-8 h-full shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FAF5FF] p-2 rounded-xl">
                        <FileText className="size-5 text-[#A855F7]" />
                      </div>
                      <h3 className="text-[18px] font-bold text-gray-900">Syllabus Report</h3>
                    </div>
                    <Link href={"#"} className="flex items-center text-[#A855F7] text-[14px] font-bold hover:underline underline-offset-4">
                      View All <ChevronRight className="size-4 ml-0.5" strokeWidth={3} />
                    </Link>
                  </div>

                  <div className="mt-2 space-y-5">
                    <div className="font-bold text-gray-900 text-[15px]">Today - Jan 10</div>
                    
                    {classes && classes.length > 0 ? (
                      <ul className="space-y-4">
                        {classes.map((cls: any) => (
                          <li key={cls._id} className="flex items-center gap-3 group">
                            <div className="size-2.5 rounded-full bg-[#A855F7] min-w-[10px] group-hover:scale-125 transition-transform" />
                            <Link href={`/class/${cls._id}`} className="text-gray-700 font-bold text-[15px] line-clamp-1 flex-1 underline-offset-4 hover:underline hover:text-[#A855F7] transition-colors">
                              {cls.subject || cls.topic || "Unknown Topic"}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-400 text-[15px] italic font-medium px-2 py-4">No classes found</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Classes List View rendered at bottom */}
            <div className="pt-6 border-t border-gray-100">
               <h2 className="text-[22px] font-bold text-gray-900 tracking-tight mb-6">Classes</h2>
               {isClassesLoading ? (
                  <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-gray-50 rounded-[20px] animate-pulse"></div>)}</div>
               ) : classes && classes.length > 0 ? (
                 <div className="grid grid-cols-1 gap-4">
                    {classes.map((cls: any) => (
                      <Link 
                        key={cls._id} 
                        href={`/class/${cls._id}`}
                        className="bg-white border border-[#E9D5FF] rounded-[24px] p-5 shadow-sm hover:shadow-md hover:border-[#A855F7] transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-5 lg:gap-6">
                          <div className="bg-[#FAF5FF] p-4 rounded-xl group-hover:bg-[#A855F7] transition-colors duration-300">
                            <FileText className="text-[#A855F7] group-hover:text-white size-6 lg:size-7" />
                          </div>
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-[17px] lg:text-[19px] text-gray-900 group-hover:text-[#A855F7] transition-colors">{cls.subject || 'Subject'} - {cls.topic || 'Topic'}</h4>
                            <div className="flex flex-wrap items-center gap-3 lg:gap-5 text-[14px] lg:text-[15px] font-semibold text-gray-500">
                              {cls.date && (
                                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                                  {dayjs(cls.date).format("DD MMM, YYYY")}
                                </span>
                              )}
                              {cls.startTime && cls.endTime && (
                                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full text-gray-600">
                                  {cls.startTime} - {cls.endTime}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-2 lg:p-3 rounded-full group-hover:bg-[#FAF5FF] transition-colors hidden sm:block">
                            <ChevronRight className="text-gray-400 group-hover:text-[#A855F7] transition-colors size-5 lg:size-6" strokeWidth={2.5} />
                        </div>
                      </Link>
                    ))}
                 </div>
               ) : (
                  <div className="text-gray-500 font-medium py-10 bg-gray-50 rounded-[24px] text-center border border-dashed border-gray-200">
                    No classes created for this batch yet.
                  </div>
               )}
            </div>

          </div>
        )}

        {activeTab === "students" && (
          <div className="p-8 text-center text-gray-500 font-medium bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
            Students list will appear here.
          </div>
        )}

        {activeTab === "add_work" && (
          <div className="p-8 text-center text-gray-500 font-medium bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
            Add Work form will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchDashboard;
