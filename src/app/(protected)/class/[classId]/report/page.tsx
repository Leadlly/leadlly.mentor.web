"use client";

import React, { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getClassDetails } from "@/actions/batch_actions";
import { getDPPs, getNotes } from "@/actions/classwork_actions";
import { getClassQuizzes } from "@/actions/quiz_actions";
import { ChevronRight, FileQuestion, FileText } from "lucide-react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

const Page = ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = use(params);
  const searchParams = useSearchParams();

  const { data: classData, isLoading } = useQuery({
    queryKey: ["class-details", classId],
    queryFn: () => getClassDetails(classId),
  });

  const { data: notesData, isLoading: notesLoading } = useQuery({
    queryKey: ["class-report-notes", classId],
    queryFn: () => getNotes({ classId }),
    enabled: !!classId,
  });

  const { data: dppsData, isLoading: dppsLoading } = useQuery({
    queryKey: ["class-report-dpps", classId],
    queryFn: () => getDPPs({ classId }),
    enabled: !!classId,
  });

  const { data: quizzesData, isLoading: quizzesLoading } = useQuery({
    queryKey: ["class-report-quizzes", classId],
    queryFn: () => getClassQuizzes({ classId }),
    enabled: !!classId,
  });

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading class report...</div>;
  }

  if (!classData) {
    return <div className="p-8 text-center text-gray-500">Class details not found.</div>;
  }

  const report = classData.classReport || {};
  const syllabusProgress = report.syllabusCompleted || 0;
  const completedChapters = report.completedChapters || 0;
  const totalChapters = report.totalChapters || 0;
  const chapterProgress = report.chapterProgress || 0;

  const totalLectures = report.totalLectures || 0;
  const totalMinutes = report.totalDuration || 0;
  const totalHours = Math.floor(totalMinutes / 60);

  const syllabusReport = classData.syllabusReport || [];
  const notes = notesData?.notes || [];
  const dpps = dppsData?.dpps || dppsData?.assignments || [];
  const quizzes = quizzesData?.quizzes || [];
  const materialLoading = notesLoading || dppsLoading || quizzesLoading;
  const syllabusReportHref = `/class/${classId}/report/syllabus${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  return (
    <div className="w-full h-full">
      <div className="flex flex-col space-y-4 md:space-y-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {/* Syllabus Section */}
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-base md:text-[18px] font-bold text-gray-900 tracking-tight">Syllabus</h2>
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

                {/* Total Chapters Completed */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-bold text-gray-800 text-[13px]">Total Chapters Completed</div>
                    <span className="text-xs font-bold text-gray-500">
                      {completedChapters}/{totalChapters}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2DD4BF] rounded-full transition-all duration-500"
                        style={{ width: `${chapterProgress}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-bold w-10 text-right text-sm">
                      {chapterProgress}%
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Lectures taken Section */}
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-base md:text-[18px] font-bold text-gray-900 tracking-tight">Lectures taken</h2>
              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                
                <div className="bg-[#FAF5FF] rounded-2xl md:rounded-[20px] p-3 md:p-5 flex flex-col items-center justify-center gap-1 md:gap-1.5 lg:gap-2 transition-transform hover:scale-[1.02]">
                  <div className="text-gray-600 font-bold text-[11px] md:text-[13px]">Total Lectures</div>
                  <div className="text-[#A855F7] text-2xl md:text-3xl lg:text-4xl font-bold">{totalLectures}</div>
                </div>

                <div className="bg-[#FAF5FF] rounded-2xl md:rounded-[20px] p-3 md:p-5 flex flex-col items-center justify-center gap-1 md:gap-1.5 lg:gap-2 transition-transform hover:scale-[1.02]">
                  <div className="text-gray-600 font-bold text-[11px] md:text-[13px]">Total Time</div>
                  <div className="text-[#A855F7] text-2xl md:text-3xl lg:text-4xl font-bold flex items-baseline gap-1">
                    {totalHours} <span className="text-base md:text-lg lg:text-xl font-bold">hr</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Material Section */}
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-base md:text-[18px] font-bold text-gray-900 tracking-tight">Material</h2>
              <div className="bg-white border border-[#F2E0FF] rounded-2xl md:rounded-[20px] p-4 md:p-5 lg:p-6 shadow-sm space-y-4">
                {materialLoading ? (
                  <div className="text-sm text-gray-400 font-medium animate-pulse">Loading material...</div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      <div className="rounded-xl bg-[#FAF5FF] p-3 text-center">
                        <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">Notes</p>
                        <p className="text-xl md:text-2xl font-bold text-[#A855F7]">{notes.length}</p>
                      </div>
                      <div className="rounded-xl bg-blue-50 p-3 text-center">
                        <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">DPPs</p>
                        <p className="text-xl md:text-2xl font-bold text-blue-600">{dpps.length}</p>
                      </div>
                      <div className="rounded-xl bg-amber-50 p-3 text-center">
                        <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">Quizzes</p>
                        <p className="text-xl md:text-2xl font-bold text-amber-600">{quizzes.length}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <MaterialList
                        title="Notes"
                        emptyText="No notes added"
                        items={notes}
                        iconColor="text-purple-500"
                        getTitle={(note: any) => note.title || "Untitled note"}
                        getDate={(note: any) => note.uploadedAt || note.createdAt}
                        getHref={(note: any) => note.attachments?.[0]?.fileUrl}
                      />
                      <MaterialList
                        title="DPPs"
                        emptyText="No DPPs added"
                        items={dpps}
                        iconColor="text-blue-500"
                        getTitle={(dpp: any) => dpp.title || "Untitled DPP"}
                        getDate={(dpp: any) => dpp.createdAt || dpp.uploadedAt || dpp.dueDate}
                        getHref={(dpp: any) => dpp.attachments?.[0]?.fileUrl}
                      />
                      <MaterialList
                        title="Quizzes"
                        emptyText="No quizzes added"
                        items={quizzes}
                        iconColor="text-amber-500"
                        icon="quiz"
                        getTitle={(quiz: any) => quiz.chapterName ? `${quiz.chapterName} Quiz` : "Quiz"}
                        getDate={(quiz: any) => quiz.createdAt}
                        getMeta={(quiz: any) => {
                          const topics = quiz.topics?.length ? quiz.topics.join(", ") : "No topic";
                          return `${quiz.chapterName || "No chapter"} • ${topics}`;
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2 md:space-y-3 lg:space-y-4">
            <h2 className="text-[18px] font-bold text-transparent select-none hidden lg:block">Spacer</h2>
            {/* Syllabus Report Box */}
            <div className="bg-white border border-[#F2E0FF] rounded-2xl md:rounded-[20px] p-4 md:p-5 lg:p-6 h-full shadow-sm max-h-[430px] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#FAF5FF] p-2 rounded-xl">
                    <FileText className="size-5 text-[#A855F7]" />
                  </div>
                  <h3 className="text-[16px] font-bold text-gray-900">Syllabus Report</h3>
                </div>
                <Link
                  href={syllabusReportHref}
                  className="flex items-center text-[#A855F7] text-[13px] font-bold hover:underline underline-offset-4"
                >
                  View All <ChevronRight className="size-4 ml-0.5" strokeWidth={3} />
                </Link>
              </div>

              <div className="mt-2 space-y-4 flex-1 overflow-y-auto pr-2">
                {syllabusReport.length > 0 ? (
                  syllabusReport.map((day: any) => (
                    <div key={day.date} className="space-y-2 border-b border-gray-50 pb-4 last:border-b-0">
                      <div className="font-bold text-gray-900 text-[13px]">
                        {dayjs(day.date).format("DD MMM, YYYY")}
                      </div>
                      <div className="space-y-2">
                        {day.lectures.map((lecture: any) => (
                          <div key={lecture._id} className="rounded-xl bg-gray-50 p-3">
                            <p className="font-bold text-gray-800 text-sm capitalize">{lecture.title || "Lecture"}</p>
                            <p className="text-xs text-gray-500 mt-1 capitalize">
                              Chapters: {(lecture.chapters || []).map((item: any) => item.name).join(", ") || "No chapter"}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 capitalize">
                              Topics: {(lecture.topics || []).map((item: any) => item.name).join(", ") || "No topic"}
                            </p>
                            {(lecture.subtopics || []).length > 0 && (
                              <p className="text-xs text-purple-600 mt-1 capitalize">
                                Subtopics: {lecture.subtopics.map((item: any) => item.name).join(", ")}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-[13px] italic font-medium px-2 py-4">No syllabus work added yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaterialList = ({
  title,
  emptyText,
  items,
  iconColor,
  icon = "file",
  getTitle,
  getDate,
  getMeta,
  getHref,
}: {
  title: string;
  emptyText: string;
  items: any[];
  iconColor: string;
  icon?: "file" | "quiz";
  getTitle: (item: any) => string;
  getDate: (item: any) => string | Date | undefined;
  getMeta?: (item: any) => string;
  getHref?: (item: any) => string | undefined;
}) => {
  const Icon = icon === "quiz" ? FileQuestion : FileText;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{title}</p>
        <span className="text-[11px] font-bold text-gray-400">{items.length}</span>
      </div>

      {items.length > 0 ? (
        <div className="space-y-1.5">
          {items.slice(0, 5).map((item: any) => {
            const href = getHref?.(item);
            const content = (
              <>
                <Icon className={`size-4 shrink-0 mt-0.5 ${iconColor}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-gray-800 truncate capitalize">{getTitle(item)}</p>
                    <span className="text-[10px] font-semibold text-gray-400 shrink-0">
                      {getDate(item) ? dayjs(getDate(item)).format("DD MMM") : ""}
                    </span>
                  </div>
                  {getMeta && (
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 capitalize">{getMeta(item)}</p>
                  )}
                </div>
              </>
            );

            return href ? (
              <a
                key={item._id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 rounded-xl bg-gray-50 px-3 py-2 hover:bg-purple-50/70 transition-colors"
              >
                {content}
              </a>
            ) : (
              <div key={item._id} className="flex items-start gap-2 rounded-xl bg-gray-50 px-3 py-2">
                {content}
              </div>
            );
          })}
          {items.length > 5 && (
            <p className="text-center text-[11px] font-semibold text-purple-600">
              +{items.length - 5} more
            </p>
          )}
        </div>
      ) : (
        <p className="rounded-xl bg-gray-50 px-3 py-2 text-xs font-medium text-gray-400">{emptyText}</p>
      )}
    </div>
  );
};

export default Page;
