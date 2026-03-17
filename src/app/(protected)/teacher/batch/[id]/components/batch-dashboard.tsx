"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBatchDetails, getBatchClasses } from "@/actions/batch_actions";
import { ChevronLeft, FileText, ChevronRight, Megaphone, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import AnnouncementList from "@/components/shared/AnnouncementList";
import AnnouncementModal from "@/components/shared/AnnouncementModal";
import { Button } from "@/components/ui/button";

const BatchDashboard = ({ batchId }: { batchId: string }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("report");
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [announcementRefreshKey, setAnnouncementRefreshKey] = useState(0);

  const { data: batch, isLoading: isBatchLoading } = useQuery({
    queryKey: ["batch-details", batchId],
    queryFn: () => getBatchDetails(batchId),
  });

  const { data: classes, isLoading: isClassesLoading } = useQuery({
    queryKey: ["batch-classes", batchId],
    queryFn: () => getBatchClasses(batchId),
  });

  const { data: studentsData, isLoading: isStudentsLoading } = useQuery({
    queryKey: ["batch-students", batchId],
    queryFn: () => import("@/actions/batch_actions").then((m) => m.getBatchStudents(batchId)),
    enabled: activeTab === "students",
  });

  if (isBatchLoading || isClassesLoading) {
    return <div className="p-6 text-center text-gray-500 animate-pulse">Loading batch data...</div>;
  }

  if (!batch) {
    return <div className="p-6 text-center text-red-500">Batch not found</div>;
  }

  const tabs = [
    { id: "report", label: "Report" },
    { id: "announcements", label: "Announcements" },
    { id: "students", label: "Students" },
    { id: "add_work", label: "Add Work" },
  ];

  const syllabusProgress = batch.batchReport?.syllabusProgress || 0;
  const totalClass = batch.batchReport?.totalClasses || 0;
  const completedClasses = batch.batchReport?.completedClasses || 0;
  const classProgress = totalClass > 0 ? Math.round((completedClasses / totalClass) * 100) : 0;

  const totalMinutes = batch.batchReport?.totalDuration || 0;
  const totalHours = Math.floor(totalMinutes / 60);

  const pendingClasses = batch.batchReport?.pendingClasses || 0;
  const totalStudents = studentsData?.students?.length || batch.batchReport?.totalStudents || 0;

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header outside */}
      <div className="flex items-center gap-2 md:gap-4 px-3 md:px-8 py-3 md:py-6 mb-1 md:mb-2">
        <button onClick={() => router.push("/teacher/batches")} className="p-1.5 md:p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center shrink-0">
          <ChevronLeft className="size-4 md:size-5 text-gray-800" strokeWidth={2.5} />
        </button>
        <h1 className="text-lg md:text-2xl font-bold text-gray-900 capitalize tracking-tight truncate">{batch.name}</h1>
      </div>

      <div className="flex-1 w-full bg-white rounded-t-[24px] md:rounded-t-[40px] shadow-[0_-4px_20px_rgba(0,0,0,0.02)] px-3 md:px-8 py-4 md:py-6 border-t border-gray-100 flex flex-col pb-20 md:pb-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-4 md:mb-8 gap-3 md:gap-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 md:pb-4 text-xs md:text-[15px] font-bold transition-all relative whitespace-nowrap shrink-0 ${
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
          <div className="flex flex-col space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {/* Left Column */}
              <div className="space-y-4 md:space-y-6 lg:space-y-8">
                {/* Syllabus Section */}
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-base md:text-[18px] font-bold text-gray-900 tracking-tight">Progress Overview</h2>
                  <div className="bg-white border border-[#F2E0FF] rounded-2xl md:rounded-[20px] p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 shadow-sm">
                    
                    {/* Syllabus Completed */}
                    <div className="space-y-2">
                       <div className="font-bold text-gray-800 text-[13px]">Syllabus Completed</div>
                       <div className="flex items-center gap-3">
                         <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                           <div 
                             className="h-full bg-[#A855F7] rounded-full transition-all duration-500" 
                             style={{ width: `${syllabusProgress}%` }}
                           />
                         </div>
                         <span className="text-gray-900 font-bold w-10 text-right text-sm">
                           {syllabusProgress}%
                         </span>
                       </div>
                    </div>

                    {/* Class Progress */}
                    <div className="space-y-2">
                       <div className="font-bold text-gray-800 text-[13px]">Classes Completed</div>
                       <div className="flex items-center gap-3">
                         <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                           <div 
                             className="h-full bg-[#2DD4BF] rounded-full transition-all duration-500" 
                             style={{ width: `${classProgress}%` }}
                           />
                         </div>
                         <span className="text-gray-900 font-bold w-10 text-right text-sm">
                           {classProgress}%
                         </span>
                       </div>
                    </div>

                  </div>
                </div>

                {/* Batch Metrics Section */}
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-base md:text-[18px] font-bold text-gray-900 tracking-tight">Batch Metrics</h2>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                    
                    <div className="bg-[#FAF5FF] rounded-2xl md:rounded-[20px] p-3 md:p-4 flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-transform hover:scale-[1.02]">
                      <div className="text-gray-600 font-bold text-[11px] md:text-[12px] uppercase">Total Classes</div>
                      <div className="text-[#A855F7] text-2xl md:text-3xl font-bold">{totalClass}</div>
                    </div>

                    <div className="bg-[#FAF5FF] rounded-2xl md:rounded-[20px] p-3 md:p-4 flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-transform hover:scale-[1.02]">
                      <div className="text-gray-600 font-bold text-[11px] md:text-[12px] uppercase">Total Hours</div>
                      <div className="text-[#A855F7] text-2xl md:text-3xl font-bold">{totalHours}</div>
                    </div>

                    <div className="bg-[#F0FDFA] rounded-2xl md:rounded-[20px] p-3 md:p-4 flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-transform hover:scale-[1.02]">
                      <div className="text-gray-600 font-bold text-[11px] md:text-[12px] uppercase">Pending Classes</div>
                      <div className="text-[#0D9488] text-2xl md:text-3xl font-bold">{pendingClasses}</div>
                    </div>

                    <div className="bg-[#FFFBEB] rounded-2xl md:rounded-[20px] p-3 md:p-4 flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-transform hover:scale-[1.02]">
                      <div className="text-gray-600 font-bold text-[11px] md:text-[12px] uppercase">Enrolled Students</div>
                      <div className="text-[#D97706] text-2xl md:text-3xl font-bold flex items-baseline gap-1">
                        {totalStudents}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-2 md:space-y-3 lg:space-y-4">
                <h2 className="text-[18px] font-bold text-transparent select-none hidden lg:block">Spacer</h2>
                {/* Syllabus Report Box */}
                <div className="bg-white border border-[#F2E0FF] rounded-2xl md:rounded-[20px] p-4 md:p-5 lg:p-6 h-full shadow-sm max-h-[350px] overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FAF5FF] p-2 rounded-xl">
                        <FileText className="size-5 text-[#A855F7]" />
                      </div>
                      <h3 className="text-[16px] font-bold text-gray-900">Syllabus Report</h3>
                    </div>
                    <Link href={"#"} className="flex items-center text-[#A855F7] text-[13px] font-bold hover:underline underline-offset-4">
                      View All <ChevronRight className="size-4 ml-0.5" strokeWidth={3} />
                    </Link>
                  </div>

                  <div className="mt-2 space-y-4 flex-1 overflow-y-auto pr-2">
                    <div className="font-bold text-gray-900 text-[13px]">Today - Jan 10</div>
                    
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
            <div className="pt-4 md:pt-6 border-t border-gray-100">
               <h2 className="text-lg md:text-[22px] font-bold text-gray-900 tracking-tight mb-4 md:mb-6">Classes</h2>
               {isClassesLoading ? (
                  <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-gray-50 rounded-[20px] animate-pulse"></div>)}</div>
               ) : classes && classes.length > 0 ? (
                 <div className="grid grid-cols-1 gap-4">
                    {classes.map((cls: any) => (
                      <Link 
                        key={cls._id} 
                        href={`/class/${cls._id}`}
                        className="bg-white border border-[#E9D5FF] rounded-2xl md:rounded-[24px] p-3 md:p-5 shadow-sm hover:shadow-md hover:border-[#A855F7] transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3 md:gap-5 lg:gap-6 min-w-0 flex-1">
                          <div className="bg-[#FAF5FF] p-2.5 md:p-4 rounded-lg md:rounded-xl group-hover:bg-[#A855F7] transition-colors duration-300 shrink-0">
                            <FileText className="text-[#A855F7] group-hover:text-white size-5 md:size-6 lg:size-7" />
                          </div>
                          <div className="space-y-0.5 md:space-y-1.5 min-w-0">
                            <h4 className="font-bold text-sm md:text-[17px] lg:text-[19px] text-gray-900 group-hover:text-[#A855F7] transition-colors truncate">{cls.subject || 'Subject'} - {cls.topic || 'Topic'}</h4>
                            <div className="flex flex-wrap items-center gap-1.5 md:gap-3 lg:gap-5 text-[11px] md:text-[14px] lg:text-[15px] font-semibold text-gray-500">
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

        {activeTab === "announcements" && (
          <div className="flex flex-col space-y-4 md:space-y-6">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="bg-purple-100 p-1.5 md:p-2 rounded-lg md:rounded-xl">
                        <Megaphone className="size-4 md:size-5 text-[#A855F7]" />
                    </div>
                    <h2 className="text-base md:text-xl font-bold text-gray-900 tracking-tight">Announcements</h2>
                </div>
                <Button 
                    onClick={() => setIsAnnouncementModalOpen(true)}
                    className="rounded-full bg-[#A855F7] hover:bg-[#9333EA] font-bold px-3 md:px-5 h-9 md:h-11 text-xs md:text-sm shadow-lg shadow-purple-100"
                >
                  <Plus className="mr-1 md:mr-2 size-4 md:size-5" /> <span className="hidden md:inline">Add</span> Announcement
                </Button>
            </div>
            <AnnouncementList batchId={batchId} refreshKey={announcementRefreshKey} />
          </div>
        )}

        {activeTab === "students" && (
          <div className="flex-1 w-full relative">
            {isStudentsLoading ? (
              <div className="p-8 text-center text-gray-500 font-medium bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
                Loading students...
              </div>
            ) : studentsData && studentsData.students && studentsData.students.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-[20px] lg:gap-[30px]">
                {studentsData.students.map((student: any) => (
                   <Link href={`/student/${student._id}`} key={student._id}>
                      <div className="bg-white border shadow-sm border-gray-200 rounded-xl md:rounded-2xl justify-center flex p-3 md:p-4 px-2 flex-col items-center hover:shadow-md transition-shadow">
                        <div className="flex flex-col mt-[5px] items-center text-center">
                          <div className="w-12 h-12 bg-[#F3E8FF] text-[#A855F7] rounded-full flex items-center justify-center font-bold text-lg mb-3">
                            {student.firstname?.charAt(0) || "U"}
                            {student.lastname?.charAt(0) || ""}
                          </div>
                          <div className="font-semibold text-sm line-clamp-1">{student.firstname} {student.lastname}</div>
                          <div className="text-[#504F4F] text-xs font-medium mt-1">Class: {student.academic?.standard || "N/A"}</div>
                          <div className="font-semibold text-[10px] text-[#464646] mt-1.5">
                            Level-
                            <span className="font-bold text-[#0075FF] ml-0.5 text-[11px]">
                              {student.details?.level?.number || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                   </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 font-medium bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
                No students are currently allocated.
              </div>
            )}
          </div>
        )}

        {activeTab === "add_work" && (
          <div className="p-8 text-center text-gray-500 font-medium bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
            Add Work form will appear here.
          </div>
        )}
      </div>
      <AnnouncementModal 
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        batchId={batchId}
        onSuccess={() => setAnnouncementRefreshKey(prev => prev + 1)}
      />
    </div>
  );
};

export default BatchDashboard;
