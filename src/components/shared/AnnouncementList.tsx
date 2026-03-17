"use client";

import React, { useEffect, useState } from "react";
import { getAnnouncements } from "@/actions/announcement_actions";
import { Paperclip, Megaphone, Calendar } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface AnnouncementListProps {
  batchId?: string;
  classId?: string;
  refreshKey?: number;
}

const AnnouncementList = ({ batchId, classId, refreshKey }: AnnouncementListProps) => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    const res = await getAnnouncements({ batchId, classId });
    if (res.success) {
      setAnnouncements(res.announcements);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [batchId, classId, refreshKey]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-50 animate-pulse rounded-[24px]" />
        ))}
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Megaphone className="size-12 mb-4 opacity-20" />
        <p className="font-medium">No announcements found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {announcements.map((ann) => (
        <div 
          key={ann._id} 
          className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500" />
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <Calendar className="size-4" />
              {dayjs(ann.createdAt).fromNow()}
            </div>
          </div>

          <div className="text-gray-900 text-base font-medium whitespace-pre-wrap mb-4">
            {ann.content}
          </div>

          {ann.attachment && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group/attach">
              <Paperclip className="size-4 text-purple-600 group-hover/attach:scale-110 transition-transform" />
              <span className="text-sm font-bold text-gray-700">{ann.attachment.title}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnnouncementList;
