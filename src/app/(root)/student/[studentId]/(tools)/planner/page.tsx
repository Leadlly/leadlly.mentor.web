"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/shared/Header";
import WeekPicker from "./components/weekpicker";
import Plannercontent from "./components/Plannercontent";
import { getplanner } from "@/actions/user_actions";
import Loader from "@/components/shared/Loader";

interface Planner {
  days: any[];
}

export default function Page({
  params: { studentId },
}: {
  params: { studentId: string };
}) {
  const [data, setData] = useState<Planner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getplanner(studentId);
        if (result === null) {
          setError("No planner exists for current time");
        } else {
          setData(result.data);
        }
      } catch (err) {
        setError("An error occurred while fetching planner");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-start h-[calc(100dvh-120px)] gap-3 md:pt-0">
      <div className="md:bg-[#E8DAFE] md:shadow-none shadow-md shadow-inner-outer pl-[14px] md:pl-[0px] py-[2%] px-[1.8%] md:rounded-[7px] flex md:flex justify-between items-center">
        <Header
          title="Planner"
          titleClassName="text-[24px] md:text-3xl lg:text-[30px]"
        />
        <WeekPicker />
      </div>
      {data && data.days ? (
        <Plannercontent weekstopic={data.days} />
      ) : (
        <div>No planner exists for current period</div>
      )}
    </div>
  );
}
