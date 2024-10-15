"use client";

import { useState } from "react";
import SemiRadialChart from "@/components/charts/SemiRadialChart";
import TabNavItem from "@/components/shared/TabNavItem";
import TabContent from "@/components/shared/TabContent";
import { useAppSelector } from "@/redux/hooks";

const SubjectProgress = ({ userSubjects }: any) => {
  const [activeTab, setActiveTab] = useState(userSubjects?.[0].name);

  const subject = userSubjects?.filter(
    (subject: any) => subject.name === activeTab
  )[0];

  const roundedProgress = Math.round(subject?.overall_progress || 0);
  const roundedEfficiency = Math.round(subject?.overall_efficiency || 0);

  return (
    <div className="h-full bg-[#FBFAFC] rounded-2xl border-[1px] border-[#D8D5D5] shadow-custom-black py-2">
      <div className="px-3 flex items-center justify-between">
        <h4 className="text-xs md:text-sm font-bold">Subject Progress</h4>
        <ul className="flex items-center gap-1 border p-[2px] rounded-md">
          {userSubjects?.map((tab: any, i: any) => (
            <TabNavItem
              key={i}
              title={tab.name}
              id={tab.name}
              activeTab={activeTab!}
              setActiveTab={setActiveTab}
              layoutIdPrefix="subject_progress"
              activeTabClassName="h-full inset-0"
              titleClassName="capitalize"
            />
          ))}
        </ul>
      </div>

      <div className="w-full h-[250px] overflow-hidden"> {/* Set a fixed height */}
        <TabContent id={activeTab!} activeTab={activeTab!}>
          <div className="h-full grid grid-cols-2 mt-3 place-items-center gap-4"> {/* Add gap for spacing */}
            <div className="h-full flex flex-col justify-center items-center gap-2"> {/* Make it centered */}
              <SemiRadialChart
                series={[roundedProgress]}
                colors={["#6200EE"]}
                chartLabel="revision"
              />
            </div>

            <div className="h-full flex flex-col justify-center items-center gap-2"> {/* Equal height and centered */}
              <SemiRadialChart
                series={[roundedEfficiency]}
                colors={["#56CFE1"]}
                chartLabel="efficiency"
              />
            </div>
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default SubjectProgress;
