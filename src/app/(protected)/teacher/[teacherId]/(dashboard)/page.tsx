import React, { Suspense } from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getLectures } from "@/actions/lecture_actions";
import { getTeacherReport } from "@/actions/user_actions";

import ClassesTaken from "./components/classes-taken";
import SyllabusFinished from "./components/syllabus-finished";
import WeekCalendar from "./components/week-calendar";

const Page = async ({ params }: { params: Promise<{ teacherId: string }> }) => {
  const { teacherId } = await params;

  const queryClient = new QueryClient();

  const timeframe = "weekly";

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["teacher-report", teacherId],
      queryFn: getTeacherReport,
    }),
    queryClient.prefetchQuery({
      queryKey: ["weekly-lectures", timeframe, teacherId],
      queryFn: () => getLectures(timeframe),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="p-3 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {/* <SyllabusFinished /> */}
          <Suspense fallback={<div>Loading...</div>}>
            <ClassesTaken />
          </Suspense>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <WeekCalendar timeframe={timeframe} />
        </Suspense>
      </section>
    </HydrationBoundary>
  );
};

export default Page;
