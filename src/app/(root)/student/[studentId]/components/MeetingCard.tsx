import React from "react";
import DateIcon from "@/components/icons/DateIcon";
import TimeIcon from "@/components/icons/TimeIcon"; // Assume this icon exists
import TopicIcon from "@/components/icons/TopicIcon"; // Assume this icon exists
import { getFormattedDate } from "@/helpers/utils";
import { MeetingDataProps } from "@/helpers/types";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MeetingCardProps {
  data: MeetingDataProps;
  isAcceptingMeeting: string | null;
  onAccept: () => void;
  onReschedule: () => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  data,
  isAcceptingMeeting,
  onAccept,
  onReschedule,
}) => {
  return (
    <div className="py-3 p-1">
      <div className="bg-[#f3eaff] p-6 rounded-2xl mb-4 shadow-[0px_4px_4px_0px_#00000040]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#969696] font-medium text-base">
            <div className="bg-[#D9D9D9] p-2 rounded-[8px]">
              <DateIcon className="w-[14px] h-[14px]" />
            </div>
            <p className="text-[14px]">Day and Date</p>
          </div>
          <p className="text-[black] text-[16px] font-regular">
            {data.rescheduled && data.rescheduled.isRescheduled
              ? getFormattedDate(new Date(data.rescheduled.date))
              : getFormattedDate(new Date(data.date))}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#969696] font-medium text-base">
            <div className="bg-[#D9D9D9] p-2 rounded-[8px]">
              <TimeIcon className="w-[14px] h-[14px" />
            </div>
            <p className="text-[14px]">Time</p>
          </div>
          <p className="text-[black] text-[16px] font-regular">
            {data.rescheduled && data.rescheduled.isRescheduled
              ? data.rescheduled.time
              : data.time}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#969696] font-medium text-base">
            <div className="bg-[#D9D9D9] p-2 rounded-[8px]">
              <TopicIcon className="w-[14px] h-[14px]" />
            </div>
            <p className="text-[14px]">Topic</p>
          </div>
          <p className="text-[black] text-[16px] font-regular capitalize">
            {data.message}
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onAccept}
            disabled={isAcceptingMeeting === data._id || data.accepted}
            size={"sm"}
          >
            {isAcceptingMeeting === data._id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : data.accepted ? (
              "Accepted"
            ) : (
              "Accept"
            )}
          </Button>

          <Button size={"sm"} onClick={onReschedule}>
            Reschedule
          </Button>
        </div>
        <Button size={"sm"} disabled={!data.accepted || !data.gmeet.link}>
          <Link
            href={data.gmeet && data.gmeet.link ? data.gmeet.link : "#"}
            target={data.gmeet && data.gmeet.link ? "_blank" : ""}
          >
            Join Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MeetingCard;
