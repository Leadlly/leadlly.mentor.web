"use client";

import React from "react";
import { Share2, Plus, Megaphone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnnouncementModal from "@/components/shared/AnnouncementModal";

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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Link href={`/teacher/batch/${batch._id}`} className="block h-full group">
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-200 flex flex-col h-full relative group-hover:border-purple-300 transition-colors cursor-pointer">
          <div className="flex justify-between items-start gap-2 md:gap-3 w-full">
            <div className="flex gap-3 md:gap-4 items-center flex-1 min-w-0">
              <div className="bg-blue-600 rounded-xl md:rounded-2xl shrink-0 flex items-center justify-center size-10 md:size-12">
                <Share2 className="text-white size-5 md:size-6" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-[15px] md:text-lg font-semibold text-gray-900 truncate w-full group-hover:text-purple-700 transition-colors" title={batch.name}>
                  {batch.name}
                </h3>
                <p className="text-xs md:text-[13px] text-gray-500 font-medium truncate w-full mt-0.5">
                  Std {batch.standard} - {batch.subjects?.join(", ")}
                </p>
              </div>
            </div>
            <div className="bg-purple-50 text-purple-700 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold shrink-0">
               {batch.batchReport?.totalStudents || 0} students
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 mt-auto pt-4 md:pt-8 w-full justify-end">
            <Button 
              className="rounded-lg bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-700 h-9 text-xs font-semibold transition-all px-3"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <Megaphone className="size-3.5 mr-1.5 shrink-0" />
              <span className="truncate">Add Announcement</span>
            </Button>
          </div>
        </div>
      </Link>
      <AnnouncementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        batchId={batch._id}
      />
    </>
  );
};

export default BatchCard;
