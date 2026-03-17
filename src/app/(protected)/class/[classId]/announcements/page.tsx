"use client";

import React, { use, useState } from "react";
import AnnouncementList from "@/components/shared/AnnouncementList";
import AnnouncementModal from "@/components/shared/AnnouncementModal";
import { Button } from "@/components/ui/button";
import { Megaphone, Plus } from "lucide-react";

const AnnouncementsPage = ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="w-full flex flex-col gap-y-4 md:gap-y-6">
      <div className="flex items-center justify-between mt-1 md:mt-2 gap-3">
        <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-purple-100 p-1.5 md:p-2 rounded-lg md:rounded-xl">
                <Megaphone className="size-4 md:size-5 text-[#A855F7]" />
            </div>
            <h2 className="text-base md:text-xl font-bold text-gray-900 tracking-tight">Announcements</h2>
        </div>
        <Button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-[#A855F7] hover:bg-[#9333EA] font-bold px-3 md:px-5 shadow-lg shadow-purple-100 h-9 md:h-11 text-xs md:text-sm"
        >
          <Plus className="mr-1 md:mr-2 size-4 md:size-5" /> <span className="hidden sm:inline">Add</span> Announcement
        </Button>
      </div>

      <AnnouncementList classId={classId} refreshKey={refreshKey} />

      <AnnouncementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        classId={classId}
        onSuccess={() => setRefreshKey(prev => prev + 1)}
      />
    </div>
  );
};

export default AnnouncementsPage;
