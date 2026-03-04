import React, { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getClassDetails } from "@/actions/batch_actions";
import ClassReport from "./components/class-report";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["class-details", classId],
    queryFn: () => getClassDetails(classId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="p-6 max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/teacher/classes" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="size-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Class Report</h1>
        </div>

        <Suspense fallback={<div>Loading Class Report...</div>}>
          <ClassReport classId={classId} />
        </Suspense>
      </section>
    </HydrationBoundary>
  );
};

export default Page;
