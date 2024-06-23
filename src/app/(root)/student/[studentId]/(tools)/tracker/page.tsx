"use client"
import Header from "@/components/shared/Header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MathsTracker from "./_components/MathsTracker";
import PhysicsTracker from "./_components/PhysicsTracker";
import ChemistryTracker from "./_components/ChemistryTracker";
import { trackerTabs } from "@/helpers/constants";
import SubjectOverview from "./_components/SubjectOverview";

const Tracker = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined  };
}) => {
  const activeSubject = searchParams["subject"] ?? "maths";

  return (
    <>
    <div className="pt-16 hidden md:pt-0 lg:flex gap-[12px] h-[calc(100dvh-120px)]">
      <div className="flex w-[830px] flex-col gap-y-4">
      <Header
        title="Tracker"
        titleClassName="text-xl md:text-3xl lg:text-page-title"
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
    </div>
    <div className="h-[calc(100dvh-120px)]  lg:hidden pt-2 md:pt-0 flex flex-col gap-y-4">
    <Header
      title="Tracker"
      titleClassName="text-xl md:py-0 py-[14px] w-full md:shadow-none shadow-md shadow-inner-outer text-[24px] text-black md:pl-0 pl-[22px] md:text-3xl lg:text-page-title"
    />

    <ul className="flex items-center md:mx-0 mx-[22px]  justify-between md:justify-start gap-5 md:gap-10 md:mt-8">
        {trackerTabs.map((tab) => (
          <Link key={tab.id} href={`/tracker?subject=${tab.subject}`}>
            <li
              className={cn(
                "capitalize border-2 px-5 md:px-7 py-2 rounded-[7px] md:rounded-xl text-[14px] md:text-2xl leading-none font-semibold transition ease-in-out duration-300",
                activeSubject === tab.id
                  ? "bg-[#9654F412] border-[#9654F4] text-[#9654F4]"
                  : "bg-transparent border-[#878787] text-[#878787]"
              )}>
              {tab.subject}
            </li>
          </Link>
        ))}
      </ul>

    <hr className="border" />

    <div className="h-full overflow-y-auto md:custom__scrollbar no-scrollbar md:pr-3 mb-16 md:mb-0">
      {activeSubject === "maths" && <MathsTracker />}

      {activeSubject === "physics" && <PhysicsTracker />}

      {activeSubject === "chemistry" && <ChemistryTracker />}
    </div>
  </div></>
    
  );
};

export default Tracker;
