import React, { Suspense } from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getAllClasses } from "@/actions/batch_actions";

import ClassList from "./components/class-list";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-classes"],
    queryFn: getAllClasses,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="p-3 max-w-7xl mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <ClassList />
        </Suspense>
      </section>
    </HydrationBoundary>
  );
};

export default Page;
