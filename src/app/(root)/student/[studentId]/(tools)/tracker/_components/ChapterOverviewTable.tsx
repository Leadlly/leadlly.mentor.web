"use client";

import DonutChart from "@/components/charts/DonutChart";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { capitalizeFirstLetter, convertDateString } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ChapterRevisionDateTable from "./ChapterRevisionDateTable";
import { chapterOverviewProps } from "@/helpers/types";

const ChapterOverviewTable = ({
  chapterData,
}: {
  chapterData: chapterOverviewProps;
}) => {
  const [viewMore, setViewMore] = useState(false);

  const onViewMoreButtonClickHandler = () => {
    setViewMore(true);
  };
  return (
    <>
      {!viewMore ? (
        <div className="w-full h-full border-2 rounded-xl pb-3 px-3 lg:px-0 lg:pr-3 flex flex-col-reverse lg:flex-row gap-y-3 lg:gap-y-0">
          <div className="flex flex-col gap-2 h-full">
            <div className="w-full border lg:border-none rounded-xl overflow-y-auto no-scrollbar h-52 lg:h-72 pb-3">
              <table className="table-fixed w-full border-separate">
                <thead>
                  <tr>
                    <th className="hidden lg:table-cell sticky top-0 z-30 lg:w-64 xl:w-80 rounded-tl-xl bg-white capitalize text-primary text-2xl leading-none text-left font-semibold py-2.5 lg:py-5 px-1.5 lg:px-3 border-b lg:border-b-2 whitespace-nowrap truncate">
                      {chapterData.chapter}
                    </th>
                    <th className="lg:hidden md:w-56 sticky top-0 z-30 w-28 rounded-tl-xl bg-white capitalize text-sm md:text-2xl leading-none text-center font-semibold py-2.5 lg:py-5 px-1.5 lg:px-3 border-b lg:border-b-2">
                      Topics
                    </th>
                    <th className="sticky top-0 z-30 bg-white font-medium text-[10px] md:text-lg leading-none py-2.5 lg:py-5 px-1.5 lg:px-3 border-b lg:border-b-2">
                      Revision Freq
                    </th>
                    <th className="sticky top-0 z-30 bg-white font-medium text-[10px] md:text-lg leading-none py-2.5 lg:py-5 px-1.5 lg:px-3 border-b lg:border-b-2">
                      Last Revised
                    </th>
                    <th className="sticky top-0 z-30 rounded-tr-xl bg-white font-medium text-[10px] md:text-lg leading-none py-2.5 lg:py-5 px-1.5 lg:px-3 border-b lg:border-b-2">
                      Efficiency (%)
                    </th>
                  </tr>
                </thead>

                <tbody className="">
                  {chapterData.topics.map((item) => (
                    <tr key={item.title}>
                      <td className="text-xs md:text-base pt-5 px-1.5 lg:px-3">
                        {capitalizeFirstLetter(item.title)}
                      </td>
                      <td className="text-center text-xs md:text-base font-semibold pt-5 px-1.5 lg:px-3">
                        {item.revisionFrequency}
                      </td>
                      <td className="text-center text-[10px] md:text-base font-semibold pt-5 px-1.5 lg:px-3">
                        {convertDateString(item.lastRevised)}
                      </td>
                      <td className="pt-5 px-1.5 lg:px-3">
                        <span className="w-full flex items-center justify-between text-[7px] md:text-xs font-semibold">
                          <span>
                            {item.efficiency < 70
                              ? "Improve"
                              : item.efficiency >= 70 && item.efficiency < 80
                              ? "Moderate"
                              : "Excellent"}
                          </span>
                          <span>{item.efficiency}%</span>
                        </span>
                        <Progress
                          value={item.efficiency}
                          className="h-1 md:h-[7px]"
                          indicatorClassName={cn(
                            item.efficiency < 70
                              ? "bg-[#ff2e2e]"
                              : item.efficiency >= 70 && item.efficiency < 80
                              ? "bg-[#FFBA53]"
                              : "bg-[#0FD679]"
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="hidden lg:block w-full text-center">
              <Button
                className="h-10 bg-primary/[0.12] hover:bg-primary/[0.16] text-primary text-xl leading-none font-semibold"
                onClick={onViewMoreButtonClickHandler}>
                View More
              </Button>
            </div>
          </div>

          <div className="min-w-44 min-h-full mt-0.5 flex flex-col">
            <p className="text-center text-lg py-5 hidden lg:block lg:border-b-2">
              Chapter Overview
            </p>
            <div className="flex-1 md:bg-primary/10 bg-custom-gradient rounded-xl border md:border-primary border-[#DCC6FA85] md:shadow-none shadow-donut lg:px-3 lg:py-5 flex lg:flex-col justify-center lg:justify-between items-center gap-5 mt-2">
              <div className="h-full lg:h-40 mt-5 lg:mt-0">
                <DonutChart />
              </div>

              <div className="flex flex-col gap-y-2 lg:-mt-5">
                <div className="flex items-center gap-2">
                  <span className="w-[12px] h-[12px] md:w-[9px] md:h-[9px] rounded-full bg-[#9654F4]"></span>
                  <span className="md:text-[9px] text-[12px] font-semibold md:font-medium leading-none">
                    Revision Completion - <span className="text-[12px] md:text-[9px] font-bold">80%</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-[12px] h-[12px] md:w-[9px] md:h-[9px] rounded-full bg-[#72EFDD]"></span>
                  <span className="md:text-[9px] text-[12px] font-semibold md:font-medium leading-non">
                    Total Efficiency - <span className="font-bold">60%</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-[12px] h-[12px] md:w-[9px] md:h-[9px] rounded-full bg-[#FFDA57]"></span>
                  <span className="md:text-[9px] text-[12px] font-semibold md:font-medium leading-non">
                    No. of Questions Solved -{" "}
                    <span className="font-bold">70%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden pt-5 flex items-center justify-between">
            <p className="text-primary text-lg leading-none font-semibold capitalize whitespace-nowrap truncate">
              {chapterData.chapter}
            </p>

            <Button
              className="h-6 bg-[#9654F41F] hover:bg-primary/[0.16] text-[#9654F4] rounded-[4.5px] text-xs leading-none font-semibold"
              onClick={onViewMoreButtonClickHandler}>
              View More
            </Button>
          </div>
        </div>
      ) : (
        <ChapterRevisionDateTable
          chapterData={chapterData}
          setViewMore={setViewMore}
        />
      )}
    </>
  );
};

export default ChapterOverviewTable;
