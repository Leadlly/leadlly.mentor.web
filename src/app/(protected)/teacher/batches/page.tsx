import React, { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getInstituteBatches } from "@/actions/batch_actions";
import { getUser } from "@/actions/user_actions";
import BatchList from "./components/batch-list";

const Page = async () => {
  const queryClient = new QueryClient();
  const userResponse = await getUser();
  const instituteId = userResponse?.user?.institute?._id;

  if (instituteId) {
    await queryClient.prefetchQuery({
      queryKey: ["institute-batches", instituteId],
      queryFn: () => getInstituteBatches(instituteId),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="p-6 max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Your Batches</h1>
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
