"use client";

import React, { use, useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getClassDetails } from "@/actions/batch_actions";
import { getClassLectures } from "@/actions/lecture_actions";
import { BookOpen, Clock, FileText, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddTodaysWorkModal from "../components/add-todays-work-modal";
import dayjs from "dayjs";

const Page = ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = use(params);

  const { data: classData, isLoading } = useQuery({
    queryKey: ["class-details", classId],
    queryFn: () => getClassDetails(classId),
  });

  const {
    data: lecturesPages,
    isLoading: lecturesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["class-lectures", classId],
    queryFn: ({ pageParam = 1 }) => getClassLectures(classId, pageParam, 10),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasMore
        ? (lastPage.pagination.page || 1) + 1
        : undefined,
    initialPageParam: 1,
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading...
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="p-8 text-center text-gray-500">
        Class details not found.
      </div>
    );
  }

  const batchId =
    typeof classData.batch === "object" ? classData.batch._id : classData.batch;
  const batchStandard =
    typeof classData.batch === "object" ? classData.batch.standard : "12";
  const batchName =
    typeof classData.batch === "object" ? classData.batch.name : "";

  const allLectures =
    lecturesPages?.pages.flatMap((p) => p.lectures) || [];
  const pagination = lecturesPages?.pages[lecturesPages.pages.length - 1]?.pagination;

  const todaysLectures = allLectures.filter((l: any) =>
    dayjs(l.lectureDate).isSame(dayjs(), "day")
  );
  const pastLectures = allLectures.filter(
    (l: any) => !dayjs(l.lectureDate).isSame(dayjs(), "day")
  );

  const totalCount = pagination?.total || allLectures.length;

  return (
    <div className="w-full space-y-4 md:space-y-6">
      <div className="flex items-start md:items-center justify-between gap-3 flex-col sm:flex-row">
        <div>
          <h2 className="text-base md:text-lg font-bold text-gray-900">Add Work</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            Record what was taught today and update student planners
          </p>
        </div>
        <AddTodaysWorkModal
          classId={classId}
          batchId={batchId}
          subject={classData.subject}
          standard={batchStandard}
          className={`${classData.subject}${batchName ? ` - ${batchName}` : ""}`}
        />
      </div>

      {totalCount > 0 && (
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="bg-purple-50 rounded-xl p-3 md:p-4 text-center">
            <p className="text-lg md:text-2xl font-bold text-purple-700">{totalCount}</p>
            <p className="text-[10px] md:text-xs font-medium text-purple-600 mt-0.5">Total Lectures</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 md:p-4 text-center">
            <p className="text-lg md:text-2xl font-bold text-blue-700">{todaysLectures.length}</p>
            <p className="text-[10px] md:text-xs font-medium text-blue-600 mt-0.5">Today</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 md:p-4 text-center">
            <p className="text-lg md:text-2xl font-bold text-green-700">{pastLectures.length}</p>
            <p className="text-[10px] md:text-xs font-medium text-green-600 mt-0.5">Past</p>
          </div>
        </div>
      )}

      {lecturesLoading ? (
        <div className="text-center py-8 text-gray-400 animate-pulse">Loading lectures...</div>
      ) : allLectures.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="size-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No work recorded yet</p>
          <p className="text-xs mt-1">Click &ldquo;Add Today&apos;s Work&rdquo; to start recording</p>
        </div>
      ) : (
        <>
          {todaysLectures.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Clock className="size-4 text-purple-500" />
                Today&apos;s Work ({dayjs().format("DD MMM YYYY")})
              </h3>
              <div className="space-y-3">
                {todaysLectures.map((lecture: any) => (
                  <LectureCard key={lecture._id} lecture={lecture} isToday />
                ))}
              </div>
            </div>
          )}

          {pastLectures.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <FileText className="size-4 text-gray-500" />
                Past Recorded Work
              </h3>
              <div className="space-y-2">
                {pastLectures.map((lecture: any) => (
                  <LectureCard key={lecture._id} lecture={lecture} />
                ))}
              </div>
            </div>
          )}

          {hasNextPage && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="cursor-pointer"
              >
                {isFetchingNextPage ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading more...</>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const LectureCard = ({ lecture, isToday = false }: { lecture: any; isToday?: boolean }) => {
  const chapters = lecture.chapters?.map((c: any) => c.name).join(", ") || "—";
  const topicNames = lecture.topics?.map((t: any) => t.name) || [];
  const subtopicNames = lecture.subtopics?.map((s: any) => s.name) || [];

  return (
    <div className={isToday ? "bg-white border border-purple-200 rounded-xl p-3 md:p-4 shadow-sm" : "bg-gray-50/80 border border-gray-100 rounded-xl p-3 md:p-4"}>
      <div className="flex items-start justify-between gap-2 md:gap-4">
        <div className="space-y-1 md:space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <BookOpen className={`size-3.5 md:size-4 shrink-0 ${isToday ? "text-purple-600" : "text-gray-400"}`} />
            <span className="font-semibold text-gray-900 text-xs md:text-sm truncate">{chapters}</span>
          </div>
          {topicNames.length > 0 && (
            <div className="flex flex-wrap gap-1 md:gap-1.5 ml-5 md:ml-6">
              {topicNames.map((name: string, i: number) => (
                <span key={i} className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full font-medium ${isToday ? "bg-purple-50 text-purple-700" : "bg-gray-100 text-gray-600"}`}>{name}</span>
              ))}
            </div>
          )}
          {subtopicNames.length > 0 && (
            <div className="flex flex-wrap gap-1 ml-6">
              {subtopicNames.map((name: string, i: number) => (
                <span key={i} className="text-[11px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded font-medium">{name}</span>
              ))}
            </div>
          )}
        </div>
        <div className="shrink-0 text-right space-y-1">
          <div className="flex items-center gap-1 text-gray-500 justify-end">
            <Calendar className="size-3" />
            <span className="text-xs font-medium">{dayjs(lecture.lectureDate).format("DD MMM YYYY")}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 justify-end">
            <Clock className="size-3" />
            <span className="text-xs font-semibold">{lecture.duration} min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
