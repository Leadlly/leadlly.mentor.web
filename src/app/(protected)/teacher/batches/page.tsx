import React, { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTeacherBatches } from "@/actions/batch_actions";
import BatchList from "./components/batch-list";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["teacher-batches"],
    queryFn: () => getTeacherBatches(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="p-3 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-8">
        <div className="flex justify-between items-center px-1">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">Your Batches</h1>
            <div className="flex gap-4">
                {/* Add Batch Button if needed */}
            </div>
        </div>
        
        <Suspense fallback={<div className="text-center py-10">Loading your batches...</div>}>
          <BatchList />
        </Suspense>
      </section>
    </HydrationBoundary>
  );
};

export default Page;
