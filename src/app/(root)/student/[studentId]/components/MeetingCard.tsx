import React from "react";
import DateIcon from "@/components/icons/DateIcon";
import TimeIcon from "@/components/icons/TimeIcon"; // Assume this icon exists
import TopicIcon from "@/components/icons/TopicIcon"; // Assume this icon exists

interface MeetingCardProps {
  date: string;
  time: string;
  topic: string;
  onAccept: () => void;
  onReschedule: () => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  date,
  time,
  topic,
  onAccept,
  onReschedule,
}) => {
  return (
    <div className="py-3 p-1">
      <div className="bg-[#f3eaff] p-6 rounded-2xl mb-4 shadow-[0px_4px_4px_0px_#00000040]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#969696] font-medium text-base">
            <div className="bg-[#D9D9D9] p-2 rounded-[8px]">
              <DateIcon className="w-[14px] h-[14px]"/>
            </div>
            <p className="text-[14px]" >Day and Date</p>
          </div>
          <p className="text-[black] text-[16px] font-regular">{date}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#969696] font-medium text-base">
            <div className="bg-[#D9D9D9] p-2 rounded-[8px]">
              <TimeIcon className="w-[14px] h-[14px"/>
            </div>
            <p className="text-[14px]">Time</p>
          </div>
          <p className="text-[black] text-[16px] font-regular">{time}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#969696] font-medium text-base">
            <div className="bg-[#D9D9D9] p-2 rounded-[8px]">
              <TopicIcon className="w-[14px] h-[14px]"/>
            </div>
            <p className="text-[14px]">Topic</p>
          </div>
          <p className="text-[black] text-[16px] font-regular">{topic}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex justify-between py-2">
          <button
            onClick={onAccept}
            className="bg-[#56249E] text-white text-[14px] font-medium px-4 py-2 rounded-[6px]"
          >
            Accept
          </button>
        </div>
        <div className="flex justify-center py-2">
          <button
            onClick={onReschedule}
            className="bg-[#56249E] text-white text-[14px] font-medium px-4 py-2 rounded-[6px]"
          >
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
