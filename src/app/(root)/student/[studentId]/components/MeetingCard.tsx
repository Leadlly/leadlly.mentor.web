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
    <div className="mb-4 border py-3 p-1">
      <div className="bg-[#ECECEC] p-6 rounded-2xl mb-4 shadow-[0px_4px_4px_0px_#00000040]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#969696] font-medium text-base">
            <div className="bg-[#D9D9D9] p-2 rounded-lg">
              <DateIcon />
            </div>
            <p>Day and Date</p>
          </div>
          <p className="text-[#767676] text-xl font-medium">{date}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#969696] font-medium text-base">
            <div className="bg-[#D9D9D9] p-2 rounded-lg">
              <TimeIcon />
            </div>
            <p>Time</p>
          </div>
          <p className="text-[#767676] text-xl font-medium">{time}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#969696] font-medium text-base">
            <div className="bg-[#D9D9D9] p-2 rounded-lg">
              <TopicIcon />
            </div>
            <p>Topic</p>
          </div>
          <p className="text-[#767676] text-xl font-medium">{topic}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 justify-between ">
        <div className="flex justify-center py-2 bg-[#ECECEC]">
          <button
            onClick={onAccept}
            className="bg-[#56249E] text-white text-lg font-medium px-20 py-2 rounded-md"
          >
            Accept
          </button>
        </div>
        <div className="flex justify-center py-2 bg-[#ECECEC]">
          <button
            onClick={onReschedule}
            className="bg-[#56249E] text-white text-lg font-medium px-16 py-2 rounded-md"
          >
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
