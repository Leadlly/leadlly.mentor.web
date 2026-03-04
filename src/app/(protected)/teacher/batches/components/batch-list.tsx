"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getInstituteBatches } from "@/actions/batch_actions";
import BatchCard from "./batch-card";
import { useAppSelector } from "@/redux/hooks";

const BatchList = () => {
  const { user } = useAppSelector((state) => state.user);
  const instituteId = user?.institute?._id;

  const { data: batches, isLoading } = useQuery({
    queryKey: ["institute-batches", instituteId],
    queryFn: () => getInstituteBatches(instituteId!),
    enabled: !!instituteId,
  });

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1,2,3].map(i => <div key={i} className="h-48 bg-gray-100 rounded-3xl"></div>)}
    </div>;
  }

  if (!batches || batches.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold text-gray-600">No batches found</h3>
        <p className="text-gray-400">Create a batch to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {batches.map((batch: any) => (
        <BatchCard key={batch._id} batch={batch} />
      ))}
    </div>
  );
};

export default BatchList;
