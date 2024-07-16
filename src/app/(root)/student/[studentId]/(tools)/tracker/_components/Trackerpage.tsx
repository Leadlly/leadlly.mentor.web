"use client"
import Header from "@/components/shared/Header";
import { useState,useEffect } from "react";
import { TTrackerProps } from "@/helpers/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { trackerTabs } from "@/helpers/constants";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import { getTracker } from "@/actions/user_actions";
import { toast } from "sonner";
import TrackerComponent from "./TrackerComponent";
import { usePathname } from "next/navigation";

const Tracker = ()=>{
  const [trackerData, setTrackerData] = useState<TTrackerProps[] | null>(null);
  const searchParams = useSearchParams();
  const userSubjects = [
    { 
      name: "maths"
    },
    {
      name: "physics"
    },
    {
      name: "chemistry" 
    }
  ]
  const activeSubject = searchParams.get("subject") ?? userSubjects?.[0].name; 
  const pathname = usePathname();
  const segments = pathname.split('/');
  const id = segments[segments.length - 2];
  useEffect(() => {
    const geTrackerData = async () => {
      try {
        const data = await getTracker(activeSubject!,id);
        setTrackerData(data);
        console.log(data)
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    geTrackerData();
  }, [activeSubject]);

  return (
    <>
    {/*<div className="pt-16 hidden md:pt-0 lg:flex gap-[12px] h-[calc(100dvh-120px)]">
      <div className="flex w-[830px] flex-col gap-y-4">
      <Header
        title="Tracker"
        titleClassName="text-xl md:w-full md:bg-[#F3F1F1] md:py-[8px] md:px-[10px] md:text-3xl lg:text-[32px]"
      />
      
      <div className="h-full overflow-y-auto custom__scrollbar pr-3 mb-16 md:mb-0">
        {activeSubject === "maths" && <MathsTracker />}

        {activeSubject === "physics" && <PhysicsTracker />}

        {activeSubject === "chemistry" && <ChemistryTracker />}
      </div>
      </div>

      <div className="h-[calc(100dvh-120px)] shadow-lg pt-[14px] px-[7px] flex flex-col custom__scrollbar overflow-y-auto">
      <ul className="flex items-center mb-[5%] justify-between md:justify-between gap-2 md:gap-[5px] md:mt-4">
        {trackerTabs.map((tab) => (
          <Link key={tab.id} href={`/student/${tab.id}/tracker?subject=${tab.subject}`}>
            <li
              className={cn(
                "capitalize px-5 md:px-[3px] py-1 rounded-lg md:rounded-[3px] text-base md:text-[18px] leading-none font-semibold transition ease-in-out duration-300",
                activeSubject === tab.id
                  ? "bg-[#E6D5FD] text-black"
                  : "text-[#878787]"
              )}>
              {tab.subject}
            </li>
          </Link>
        ))}
      </ul>
      <SubjectOverview/>
      </div>
    </div>*/}


    <div className="h-[calc(100dvh-120px)] lg:hidden pt-2 md:pt-0 flex flex-col gap-y-4">
    <Header
        title="Tracker"
        titleClassName="text-2xl md:text-3xl lg:text-page-title"
      />

      <ul className="flex items-center justify-between md:justify-start gap-5 md:gap-10 md:mt-8">
        {userSubjects?.map((tab, i) => (
          <Link key={i} href={`/student/${id}/tracker?subject=${tab.name}`}>
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

      <div className="h-full overflow-y-auto custom__scrollbar pr-3 mb-16 md:mb-0">
        {activeSubject && (
          <TrackerComponent
            activeSubject={activeSubject}
            trackerData={trackerData!}
            userSubjects={userSubjects}
          />
        )}
      </div>
  </div></>
    
  );
};

export default Tracker;