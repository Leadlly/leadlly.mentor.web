"use client";

import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClassDetails } from "@/actions/batch_actions";
import { FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

const Page = ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = use(params);

  const { data: classData, isLoading } = useQuery({
    queryKey: ["class-details", classId],
    queryFn: () => getClassDetails(classId),
  });

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading class report...</div>;
  }

  if (!classData) {
    return <div className="p-8 text-center text-gray-500">Class details not found.</div>;
  }

  const report = classData.classReport || {};
  const syllabusProgress = report.syllabusCompleted || 10;
  const chapterProgress = 5; // Placeholder for consistency

  const totalClasses = report.totalLectures || 0;
  const totalMinutes = report.totalDuration || 0;
  const totalHours = Math.floor(totalMinutes / 60);

  // Since it's a specific class, we might only have resources or assignments as the sub-list
  // using an empty array for the UI structure to match the layout requested
  const topics: any[] = [];

  return (
    <div className="w-full h-full bg-white md:bg-transparent">
      <div className="flex flex-col space-y-12 pb-10">
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
                  <div className="text-[#A855F7] text-4xl lg:text-5xl font-bold">{totalClasses}</div>
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
                <div className="font-bold text-gray-900 text-[15px]">Today - {dayjs().format('MMM DD')}</div>
                
                {topics && topics.length > 0 ? (
                  <ul className="space-y-4">
                    {topics.map((t: any) => (
                      <li key={t.id} className="flex items-center gap-3 group">
                        <div className="size-2.5 rounded-full bg-[#A855F7] min-w-[10px] group-hover:scale-125 transition-transform" />
                        <Link href={"#"} className="text-gray-700 font-bold text-[15px] line-clamp-1 flex-1 underline-offset-4 hover:underline hover:text-[#A855F7] transition-colors">
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-400 text-[15px] italic font-medium px-2 py-4">No recent topics found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
