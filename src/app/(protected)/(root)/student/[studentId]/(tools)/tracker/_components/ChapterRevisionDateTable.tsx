import React from "react";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TTrackerProps } from "@/helpers/types";
import { capitalizeFirstLetter, convertDateString } from "@/helpers/utils";
import { cn } from "@/lib/utils";

import ChapterReport from "./ChapterReport";

const ChapterRevisionDateTable = ({
  chapterData,
}: {
  chapterData: TTrackerProps;
}) => {
  return (
    <div>
      <div className="flex items-center">
        <div className="max-w-96 w-full text-[28px] font-semibold leading-tight capitalize whitespace-nowrap truncate">
          <p>{chapterData.chapter.name}</p>
        </div>
      </div>

      <div className="border rounded-2xl p-4 my-6">
        <ChapterReport chapterData={chapterData} />
      </div>

      <div className="border lg:border-none mt-3 lg:mt-0 rounded-lg pb-2 lg:mb-4">
        <div className="border rounded-2xl">
          <Table>
            <TableHeader className="[&_tr]:border-0">
              <TableRow className="bg-primary/10">
                <TableHead className="flex-1 sticky top-0 z-30 rounded-tl-xl text-black capitalize text-sm md:text-lg leading-none font-semibold py-2.5 lg:py-5 px-1.5 lg:px-3">
                  Topics
                </TableHead>
                <TableHead className="sticky top-0 z-30 text-black font-medium text-sm md:text-lg text-center leading-none py-2.5 lg:py-5 px-1.5 lg:px-3">
                  Revisions
                </TableHead>
                <TableHead className="sticky top-0 z-30 rounded-tr-xl text-black font-medium text-sm md:text-lg text-center leading-none py-2.5 lg:py-5 px-1.5 lg:px-3">
                  Accuracy
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {chapterData && chapterData.topics.length ? (
                chapterData.topics.map((item: any, index: number) => (
                  <React.Fragment key={item.name + index}>
                    <TableRow className="border-none">
                      <TableCell className="text-xs md:text-base">
                        {capitalizeFirstLetter(item.name)}
                      </TableCell>
                      <TableCell className="text-center text-xs md:text-base font-semibold">
                        {item.plannerFrequency}
                      </TableCell>
                      <TableCell className="text-center min-w-20 text-[10px] md:text-base font-semibold">
                        {Math.round(item.overall_efficiency!)}%
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-none hover:bg-transparent">
                      <TableCell colSpan={3} className="pt-0 pb-4 max-w-0">
                        <div className="flex items-center overflow-x-auto gap-2 w-full custom__scrollbar pb-2">
                          {item.studiedAt.map(
                            (revisionDate: any, index: number) => (
                              <span
                                key={index}
                                className={cn(
                                  "whitespace-nowrap px-2 py-1.5 rounded text-xs md:text-base",
                                  revisionDate.efficiency! < 60
                                    ? "bg-[#ff2e2e]/10 text-[#ff2e2e]"
                                    : revisionDate.efficiency! >= 60 &&
                                        revisionDate.efficiency! < 80
                                      ? "bg-[#ff9900]/10 text-[#ff9900]"
                                      : "bg-[#0fd679]/10 text-[#0fd679]"
                                )}
                              >
                                {convertDateString(revisionDate.date!)}
                              </span>
                            )
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <div>No topics to track!</div>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ChapterRevisionDateTable;
