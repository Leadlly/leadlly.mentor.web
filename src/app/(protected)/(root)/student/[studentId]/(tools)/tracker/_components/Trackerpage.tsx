"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { getTracker } from "@/actions/user_actions";
import Header from "@/components/shared/Header";
import Loader from "@/components/shared/Loader";
import { ISubject } from "@/helpers/types";
import { cn } from "@/lib/utils";

import TrackerComponent from "./TrackerComponent";

const Tracker = ({
  studentId,
  studentSubjects,
}: {
  studentId: string;
  studentSubjects: ISubject[];
}) => {
  const searchParams = useSearchParams();

  const activeSubject =
    searchParams.get("subject") ?? studentSubjects?.[0].name;

  const { data: trackerData, isLoading } = useQuery({
    queryKey: ["tracker", studentId, activeSubject],
    queryFn: async () => await getTracker(activeSubject, studentId),
    enabled: !!studentId && !!activeSubject,
  });

  return (
    <div className="h-[calc(100dvh-80px)] flex flex-col">
      <Header
        title="Tracker"
        titleClassName="text-2xl md:text-3xl lg:text-page-title"
      />

      <ul className="flex items-center justify-between gap-5 md:gap-10 md:mt-4">
        {studentSubjects?.map((tab, i) => (
          <Link
            key={i}
            href={`/student/${studentId}/tracker?subject=${tab.name}`}
            className={cn(
              "flex-1 flex items-center justify-center px-5 md:px-7 py-2",
              activeSubject === tab.name && "border-b-4 border-primary"
            )}
          >
            <li
              className={cn(
                "capitalize text-base md:text-2xl leading-none font-semibold transition ease-in-out duration-300",
                activeSubject === tab.name ? "text-primary" : "text-[#878787]"
              )}
            >
              {tab.name}
            </li>
          </Link>
        ))}
      </ul>

      <hr className="border" />

      <div className="flex-1 overflow-y-auto custom__scrollbar pr-3 mb-16 md:mb-0">
        {isLoading ? (
          <div className="py-16">
            <Loader />
          </div>
        ) : (
          <TrackerComponent
            activeSubject={activeSubject}
            trackerData={trackerData?.data!}
            userSubjects={studentSubjects}
          />
        )}
      </div>
    </div>
  );
};

export default Tracker;
