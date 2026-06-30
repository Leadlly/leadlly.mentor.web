"use client";
import { useState } from "react";

import DonutChart from "@/components/charts/DonutChart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TTrackerProps } from "@/helpers/types";

import ChapterReport from "./ChapterReport";
import ChapterRevisionDateTable from "./ChapterRevisionDateTable";

const ChapterOverviewTable = ({
  chapterData,
}: {
  chapterData: TTrackerProps;
}) => {
  return (
    <div className="border border-input-border mb-4 rounded-2xl p-4">
      <div className="flex flex-row items-center mb-4">
        <p className="basis-[60%] capitalize font-semibold text-[20px] truncate">
          {chapterData.chapter.name}
        </p>
        <div className="flex-1 flex items-end justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 items-center justify-center text-primary font-semibold text-[14px]"
              >
                Full Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto px-4 md:px-6">
              <DialogHeader>
                <DialogTitle className="sr-only">
                  {chapterData.chapter.name} Full Report
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Detailed topic tracker and efficiency report.
                </DialogDescription>
              </DialogHeader>
              <ChapterRevisionDateTable chapterData={chapterData} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ChapterReport chapterData={chapterData} />
    </div>
  );
};

export default ChapterOverviewTable;
