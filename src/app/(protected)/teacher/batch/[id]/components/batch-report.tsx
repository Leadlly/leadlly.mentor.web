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



  const { data: classes } = useQuery({
    queryKey: ["batch-classes", batchId],
    queryFn: () => import("@/actions/batch_actions").then(m => m.getBatchClasses(batchId)),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-7 space-y-10">
        
        {/* Syllabus Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Syllabus</h2>
          <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-center space-y-6">
             <div className="space-y-3">
               <div className="flex justify-between items-center text-sm font-bold">
                 <span className="text-gray-800 tracking-wide text-[13px]">Syllabus Completed</span>
                 <span className="text-gray-900">{batch.batchReport?.syllabusProgress || 0}%</span>
               </div>
               <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-[#A855F7] rounded-full" style={{ width: `${batch.batchReport?.syllabusProgress || 0}%` }} />
               </div>
             </div>
          </div>
        </div>

        {/* Classes Taken Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Classes taken</h2>
          <div className="grid grid-cols-2 gap-6">
             <div className="bg-[#FAF5FF] rounded-[24px] p-8 flex flex-col items-center justify-center text-center h-36">
               <p className="text-gray-600 text-[13px] font-bold tracking-wide">Total Class</p>
               <p className="text-4xl font-bold text-[#A855F7] mt-3">{batch.batchReport?.completedClasses || 0}</p>
             </div>
             
             <div className="bg-[#FAF5FF] rounded-[24px] p-8 flex flex-col items-center justify-center text-center h-36">
               <p className="text-gray-600 text-[13px] font-bold tracking-wide">Total Time</p>
               <div className="mt-3 flex items-baseline gap-1 justify-center">
                 <p className="text-4xl font-bold text-[#A855F7]">{Math.round((batch.batchReport?.totalDuration || 0) / 60)}</p>
                 <p className="text-lg font-bold text-[#A855F7]">hr</p>
               </div>
             </div>
          </div>
        </div>

      </div>

      {/* Right Column: Syllabus Report */}
      <div className="lg:col-span-5 h-[500px]">
         <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                  <div className="bg-purple-50 p-3 rounded-2xl">
                     <svg className="size-6 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="text-[17px] font-bold text-gray-900">Syllabus Report</h3>
               </div>
               <button className="text-[13px] font-bold text-[#A855F7] hover:text-purple-700 flex items-center gap-1">
                 View All
                 <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
               </button>
            </div>

            <div className="flex-1 overflow-y-auto">
               <p className="text-[14px] font-bold text-gray-900 mb-4">
                 Today - {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
               </p>
               
               {(!classes || classes.length === 0) ? (
                 <p className="text-[13px] text-gray-400 font-medium italic mt-6">
                   No classes found
                 </p>
               ) : (
                 <div className="space-y-4">
                   {classes.slice(0, 5).map((cls: any) => (
                     <div key={cls._id} className="flex justify-between items-start border-b border-gray-50 pb-3 last:border-0">
                       <div>
                         <p className="font-semibold text-gray-900 text-sm">{cls.subject}</p>
                         <p className="text-xs text-gray-500 mt-0.5">{cls.topic || "Discussion"}</p>
                       </div>
                       <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">{new Date(cls.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                     </div>
                   ))}
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default BatchReport;
