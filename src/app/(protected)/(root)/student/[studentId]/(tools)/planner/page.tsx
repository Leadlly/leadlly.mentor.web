import { Suspense } from "react";

import Header from "@/components/shared/Header";
import Loader from "@/components/shared/Loader";

import Planner from "./components/Planner";
import WeekPicker from "./components/weekpicker";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ studentId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { studentId } = await params;
  const startDate = (await searchParams)?.startDate as string | undefined;
  const endDate = (await searchParams)?.endDate as string | undefined;

  return (
    <div className="flex flex-col justify-start h-[calc(100dvh-80px)] gap-3 md:pt-0">
      <div className="md:bg-[#E8DAFE] md:shadow-none shadow-md shadow-inner-outer py-[2%] px-[1.8%] md:rounded-[7px] flex md:flex justify-between items-center">
        <Header
          title="Planner"
          titleClassName="text-[24px] md:text-3xl lg:text-[30px]"
        />
        <WeekPicker />
      </div>
      <Suspense
        key={`${studentId}${startDate}${endDate}`}
        fallback={<Loader />}
      >
        <Planner
          studentId={studentId}
          startDate={startDate}
          endDate={endDate}
        />
      </Suspense>
    </div>
  );
}
