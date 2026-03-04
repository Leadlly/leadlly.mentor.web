"use client";

import React from "react";
import { Share2, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BatchCardProps {
  batch: {
    _id: string;
    name: string;
    standard: string;
    subjects: string[];
    batchReport?: {
      totalStudents?: number;
    };
  };
}

const BatchCard = ({ batch }: BatchCardProps) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full relative">
      <div className="flex justify-between items-start gap-3 w-full">
        <div className="flex gap-3 items-center flex-1 min-w-0">
          <div className="bg-blue-600 rounded-full shrink-0 flex items-center justify-center size-12 shadow-sm">
            <Share2 className="text-white size-6" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <h3 className="text-[17px] md:text-lg font-bold text-gray-900 truncate w-full" title={batch.name}>
              {batch.name}
            </h3>
            <p className="text-xs text-gray-500 font-semibold truncate w-full mt-0.5">
              Std {batch.standard} - {batch.subjects?.join(", ")}
            </p>
          </div>
        </div>
        <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-[11px] font-bold shrink-0 shadow-sm border border-purple-200">
           {batch.batchReport?.totalStudents || 0} students
        </div>
      </div>

      <div className="flex items-center gap-3 mt-auto pt-6 w-full">
        <Link href={`/teacher/batch/${batch._id}`} className="flex-1 min-w-0">
          <Button 
            variant="outline" 
            className="w-full rounded-xl border border-purple-200 text-purple-600 hover:bg-purple-50 h-[44px] text-sm font-bold transition-all px-2 shadow-sm"
          >
            View
          </Button>
        </Link>
        <Button 
          className="flex-1 min-w-0 rounded-xl bg-purple-600 hover:bg-purple-700 text-white h-[44px] text-sm font-bold transition-all px-2 shadow-sm"
        >
          <Plus className="size-4 mr-1 shrink-0" />
          <span className="truncate">Add Work</span>
        </Button>
      </div>
    </div>
  );
};

export default BatchCard;
