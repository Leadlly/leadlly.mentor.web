import React, { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTeacherDashboard } from "@/actions/user_actions";
import { getLectures } from "@/actions/lecture_actions";
import TeacherDashboard from "./components/teacher-dashboard";

const Page = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["teacher-dashboard"],
      queryFn: getTeacherDashboard,
    }),
    queryClient.prefetchQuery({
      queryKey: ["weekly-lectures", "weekly"],
      queryFn: () => getLectures("weekly"),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="p-4 max-w-7xl mx-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh] text-gray-400 animate-pulse">
              Loading dashboard...
            </div>
          }
        >
          <TeacherDashboard />
        </Suspense>
      </section>
    </HydrationBoundary>
  );
};

export default Page;
