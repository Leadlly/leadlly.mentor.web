import Image from "next/image";
import {
  sadEmoji,
  unhappyEmoji,
  neutralEmoji,
  smilingEmoji,
  laughingEmoji,
  moodEmojis,
} from "@/helpers/constants/moodEmojis";
import MessageIcon from "@/components/icons/MessageIcon";
import { Student } from "@/helpers/types";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { getBackgroundColor } from "@/helpers/constants/efficiency";
import Link from "next/link";
import Avatar from "@/components/shared/Avatar";
import Progressbar from "@/components/shared/Progressbar";



const StudentCard = ({
  mood = "neutral",
  name,
  studentClass,
  level,
  progress,
  messages,
  efficiency,
  id: studentId,
}: Student) => {
  const moodOption = moodEmojis[mood] || smilingEmoji;
  const cardBackgroundColor = useMemo(
    () => getBackgroundColor(efficiency),
    [efficiency]
  );
  return (
    <Link href={`/student/${studentId}`}>
      <div
        className={cn(
          "flex-grow  bg-slate-500 rounded-2xl justify-center flex p-1 px-2 flex-col items-center",
          cardBackgroundColor
        )}
      >
        <div className="flex flex-col  border-b-[2px] pb-2 border-[#00AF9661] w-full justify-center items-center">
          <div className="flex flex-col mt-[10px] items-center">
            <Avatar alt="User Avatar" size={32} className="md:hidden" />{" "}
            {/* Visible on small screens */}
            <Avatar alt="User Avatar" size={44} className="hidden md:block" />
            <Image
              src={moodOption.moodImg}
              alt="checkbox-label"
              width={20}
              height={20}
              className="md:size-4 w-[10.9px] translate-x-3 -translate-y-2 "
            />
          </div>
          <div className="font-semibold md:text-base text-[10px]">{name}</div>
          <div className="text-[#504F4F] md:text-base text-[10px] font-medium">
            Class: {studentClass}
          </div>
          <div className="font-semibold md:mb-0 mb-[2%] md:text-base text-[8px] text-[#464646]">
            Level-<span className="font-bold text-[#0075FF]">{level}</span>
          </div>
          <Progressbar
            value={progress}
            indicatorClassName="h-[3px] md:h-[6px]"
          />
        </div>
        {messages > 0 ? (
          <div className="flex bg-[#ffffff] gap-[1px] md:gap-[3px] px-1 py-[2px] my-1 rounded justify-center items-center">
            <MessageIcon />
            <div className="md:text-[9px] line-clamp-1 text-balance text-[6px] text-[#3D6CA1] font-bold">
              New message arrived
            </div>
            <div className="rounded-full bg-[#FF9900C9] text-[4.5px] md:text-[7px] font-semibold text-white size-[10px] md:size-[14px] flex justify-center items-center">
              {messages}
            </div>
          </div>
        ) : (
          <div className="flex gap-[3px] px-1 py-[2px] m-1 justify-center items-center">
            <MessageIcon />
            <div className="md:text-[9px] line-clamp-1 text-balance  text-[6px] text-[#3D6CA1] font-bold">
              No Notification
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default StudentCard;
