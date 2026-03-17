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
    <div className="w-full flex flex-col gap-y-6">
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-xl">
                <Megaphone className="size-5 text-[#A855F7]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Announcements</h2>
        </div>
        <Button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-[#A855F7] hover:bg-[#9333EA] font-bold px-5 shadow-lg shadow-purple-100 h-11"
        >
          <Plus className="mr-2 size-5" /> Add Announcement
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
