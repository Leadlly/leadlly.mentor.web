import React, { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getClassDetails } from "@/actions/batch_actions";
import ClassReport from "./components/class-report";

const Page = async ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["class-details", classId],
    queryFn: () => getClassDetails(classId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="p-3 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-8">
        <Suspense fallback={<div>Loading Class Report...</div>}>
          <ClassReport classId={classId} />
        </Suspense>
      </section>
    </HydrationBoundary>
  );
};

export default Page;
