// "use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/shared/Header";
import WeekPicker from "./components/weekpicker";
import Plannercontent from "./components/Plannercontent";
// import { usePathname } from "next/navigation";
import { getplanner } from "@/actions/user_actions";

interface Planner {
  days: any[];
}

export default async function Page({
  params: { studentId },
}: {
  params: { studentId: string };
}) {
  const data = await getplanner(studentId);

  return (
    <div className="flex flex-col justify-start h-[calc(100dvh-120px)] gap-3 md:pt-0">
      <div className="md:bg-[#E8DAFE] md:shadow-none shadow-md shadow-inner-outer pl-[14px] md:pl-[0px] py-[2%] px-[1.8%] md:rounded-[7px] flex md:flex justify-between items-center">
        <Header
          title="Planner"
          titleClassName="text-[24px] md:text-3xl lg:text-[30px]"
        />
        <WeekPicker />
      </div>
      {data.data && data.data.days && (
        <Plannercontent weekstopic={data.data.days} />
      )}
    </div>
  );
}
