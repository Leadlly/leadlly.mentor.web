"use client";

import React from "react";

import Link from "next/link";

import { useSuspenseQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Plus } from "lucide-react";

import { getBatches } from "@/actions/batch_actions";
import ChemistryIcon from "@/components/icons/ChemistryIcon";
import MathsIcon from "@/components/icons/MathsIcon";
import PhysicsIcon from "@/components/icons/PhysicsIcon";

const ClassList = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["batches"],
    queryFn: getBatches,
  });

  const getSubjectColor = (subject: string) => {
    const sub = subject?.toLowerCase();
    if (sub === "chemistry") return "bg-[#1472FF]";
    if (sub === "mathematics") return "bg-primary";
    if (sub === "physics") return "bg-[#27CEB2]";
    if (sub === "biology") return "bg-primary";
    return "bg-gray-200";
  };

  const getSubjectIcon = (subject: string) => {
    const sub = subject?.toLowerCase();
    if (sub === "chemistry") return <ChemistryIcon stroke="white" />;
    if (sub === "mathematics") return <MathsIcon stroke="white" />;
    if (sub === "physics") return <PhysicsIcon stroke="white" />;
    if (sub === "biology") return <ChemistryIcon stroke="white" />;
    return null;
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-[24px] p-4 shadow-[0px_0px_10px_rgba(0,0,0,0.1)] hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-x-3">
                  <div
                    className={clsx(
                      "flex items-center justify-center w-[42px] h-[42px] rounded-full",
                      getSubjectColor(item.subject)
                    )}
                  >
                    {getSubjectIcon(item.subject)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-[19px] capitalize leading-tight">
                      {item.batch.name}
                    </h2>
                    <p className="text-gray-500 text-[12px] capitalize">
                      {`${item.batch.standard}th Class`} - {item.subject}
                    </p>
                  </div>
                </div>
                <div className="bg-primary/10 h-[26px] px-2 flex items-center justify-center rounded-full">
                  <span className="text-primary font-semibold text-[10px]">
                    {item.batch?.students?.length > 0
                      ? item.batch.students.length
                      : 0}{" "}
                    students
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-row items-end gap-x-3">
                <Link
                  href={{
                    pathname: `/class/${item._id}/report`,
                    query: {
                      batchId: item.batch._id,
                      className: item.batch.name,
                      standard: item.batch.standard,
                      subject: item.subject,
                    },
                  }}
                  className="flex-1"
                >
                  <div className="border border-primary rounded-xl py-[6px] px-4 flex items-center justify-center hover:bg-primary/5 transition-colors cursor-pointer">
                    <span className="text-primary text-[13px]">View Class</span>
                  </div>
                </Link>

                <Link
                  href={{
                    pathname: `/class/${item._id}/add-work`,
                    query: {
                      batchId: item.batch._id,
                      className: item.batch.name,
                      standard: item.batch.standard,
                      subject: item.subject,
                    },
                  }}
                >
                  <div className="bg-primary border border-primary rounded-xl py-[6px] px-4 flex flex-row items-center justify-center gap-x-2 hover:bg-primary/90 transition-colors cursor-pointer">
                    <Plus size={15} color="white" />
                    <span className="text-white font-semibold text-[13px]">
                      Add Work
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center text-center text-gray-500 font-medium text-lg">
          No batches found
        </div>
      )}
    </>
  );
};

export default ClassList;
