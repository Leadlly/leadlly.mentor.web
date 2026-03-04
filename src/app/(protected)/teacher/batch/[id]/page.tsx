import React, { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getBatchDetails, getBatchClasses } from "@/actions/batch_actions";
import BatchDashboard from "./components/batch-dashboard";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["batch-details", id],
      queryFn: () => getBatchDetails(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ["batch-classes", id],
      queryFn: () => getBatchClasses(id),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BatchDashboard batchId={id} />
    </HydrationBoundary>
  );
};

export default Page;
