"use client";
import Header from "@/components/shared/Header";
import { useState, useEffect } from "react";
import { ISubject, TTrackerProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { trackerTabs } from "@/helpers/constants";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import { getTracker } from "@/actions/user_actions";
import { toast } from "sonner";
import TrackerComponent from "./TrackerComponent";
import { usePathname } from "next/navigation";
import Loader from "@/components/shared/Loader";

const Tracker = ({
  studentId,
  studentSubjects,
}: {
  studentId: string;
  studentSubjects: ISubject[];
}) => {
  const [trackerData, setTrackerData] = useState<TTrackerProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const activeSubject =
    searchParams.get("subject") ?? studentSubjects?.[0].name;

  useEffect(() => {
    const geTrackerData = async () => {
      setIsLoading(true);
      try {
        const data = await getTracker(activeSubject!, studentId);
        setTrackerData(data.data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    geTrackerData();
  }, [activeSubject]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-[calc(100dvh-120px)] flex flex-col gap-y-4">
      <Header
        title="Tracker"
        titleClassName="text-2xl md:text-3xl lg:text-page-title"
      />

      <ul className="flex items-center justify-between md:justify-start gap-5 md:gap-10 md:mt-4">
        {studentSubjects?.map((tab, i) => (
          <Link
            key={i}
            href={`/student/${studentId}/tracker?subject=${tab.name}`}
          >
            <li
              className={cn(
                "capitalize border-2 px-5 md:px-7 py-2 rounded-lg md:rounded-xl text-base md:text-2xl leading-none font-semibold transition ease-in-out duration-300",
                activeSubject === tab.name
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-transparent border-[#878787] text-[#878787]"
              )}
            >
              {tab.name}
            </li>
          </Link>
        ))}
      </ul>

      <hr className="border" />

      <div className="flex-1 overflow-y-auto custom__scrollbar pr-3 mb-16 md:mb-0">
        {activeSubject && (
          <TrackerComponent
            activeSubject={activeSubject}
            trackerData={trackerData!}
            userSubjects={studentSubjects}
          />
        )}
      </div>
    </div>
  );
};

export default Tracker;
