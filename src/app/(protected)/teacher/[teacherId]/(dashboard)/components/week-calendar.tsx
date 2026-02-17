"use client";

import React from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { ChevronRight } from "lucide-react";

import { getLectures } from "@/actions/lecture_actions";
import { Button } from "@/components/ui/button";
import { DaySchedule } from "@/helpers/types";

const WeekCalendar = ({ timeframe }: { timeframe: string }) => {
  const { teacherId } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: ["weekly-lectures", timeframe, teacherId],
    queryFn: () => getLectures(timeframe),
  });

  const getCurrentWeekData = (): DaySchedule[] => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday

    return Array.from({ length: 7 }).map((_, i) => {
      const current = addDays(start, i);

      const classes =
        data?.lectures.filter((lecture) =>
          isSameDay(lecture.lectureDate, current)
        ) ?? [];

      return {
        day: format(current, "EEE")[0], // e.g., 'M', 'T'
        date: format(current, "d"),
        classes,
      };
    });
  };
  const containerRef = React.useRef<HTMLDivElement>(null);

  const weekData = getCurrentWeekData();

  // Helper to get color classes based on logic
  const getBatchColorClass = (batchName: string) => {
    switch (batchName) {
      case "sigma":
        return "bg-blue-300 text-blue-900"; // approximated sigma_300
      case "delta":
        return "bg-green-100 text-green-800"; // approximated delta_100
      case "gamma":
        return "bg-yellow-100 text-yellow-800"; // approximated gamma_100
      default:
        return "bg-primary/20 text-primary-foreground"; // approximated primary200
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Calendar</h3>

        <Button asChild variant={"link"} className="h-max">
          <Link href={"/lecture-calendar"}>
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="w-full border border-input rounded-md overflow-hidden bg-card">
        <div ref={containerRef} className="flex overflow-x-auto pb-2">
          {weekData.map((item, index) => (
            <div
              key={index}
              className={`shrink-0 w-1/4 md:w-1/5 lg:w-[14.28%] min-h-[150px] border-r border-input p-2 flex flex-col gap-2 ${
                weekData.length - 1 === index ? "border-r-0" : ""
              }`}
            >
              <div className="flex flex-col items-center border-b border-input pb-2 mb-2">
                <span className="font-medium text-muted-foreground text-sm">
                  {item.day}
                </span>
                <span className="font-medium text-muted-foreground text-sm">
                  {item.date}
                </span>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                {item.classes.map((cls, clsIdx) => (
                  <div
                    key={clsIdx}
                    className={`rounded p-1 px-2 text-center flex flex-col items-center justify-center text-[10px] sm:text-xs capitalize font-medium ${getBatchColorClass(
                      cls.batch.name
                    )}`}
                  >
                    <span>
                      {cls.batch.name} -{" "}
                      {cls.class.subject === "chemistry"
                        ? "chem"
                        : cls.class.subject === "physics"
                          ? "phy"
                          : cls.class.subject}
                    </span>
                  </div>
                ))}
                {item.classes.length === 0 && (
                  <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground/50">
                    No classes
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekCalendar;
