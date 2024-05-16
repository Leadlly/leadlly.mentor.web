import Image from "next/image";
import Progressbar from "./Progressbar";
import {
  sadEmoji,
  unhappyEmoji,
  neutralEmoji,
  smilingEmoji,
  laughingEmoji,
} from "@/helpers/constants/moodEmojis";
import MessageIcon from "@/components/icons/MessageIcon";
import { Student } from "@/helpers/types";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import avatar from "/public/assets/images/d4ab00b00e2c1292dc8d8cfaa7144e3d.png";
import clsx from "clsx";
import { getBackgroundColor } from "@/helpers/constants/efficiency";

const moodEmojis = {
  sad: sadEmoji,
  unhappy: unhappyEmoji,
  neutral: neutralEmoji,
  smiling: smilingEmoji,
  laughing: laughingEmoji,
};

const StudentCard = ({
  mood = "neutral",
  name,
  studentClass,
  level,
  progress,
  messages,
  efficiency,
  id,
}: Student) => {
  const moodOption = moodEmojis[mood] || smilingEmoji;
  const cardBackgroundColor = useMemo(
    () => getBackgroundColor(efficiency),
    [efficiency]
  );
  return (
    <div
      className={cn(
        "flex-grow  bg-slate-500 rounded-2xl justify-center flex p-1 px-2 flex-col items-center",
        cardBackgroundColor
      )}
    >
      <div className="flex flex-col  border-b-[2px] pb-2 border-[#00AF9661] w-full justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="size-[44px] rounded-full cursor-pointer">
            <Image
              src={avatar}
              alt="avatar"
              width={64}
              height={64}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <Image
            src={moodOption.moodImg}
            alt="checkbox-label"
            width={20}
            height={20}
            className=" size-4 translate-x-4 -translate-y-4 "
          />
        </div>
        <div className="font-semibold text-base">{name}</div>
        <div className="  text-[#504F4F] font-medium">
          Class: {studentClass}
        </div>
        <div className="font-semibold text-[#464646]">
          Level-<span className="font-bold text-[#0075FF]">{level}</span>
        </div>
        <Progressbar percentage={progress} />
      </div>
      {messages > 0 ? (
        <div className="flex bg-[#ffffff] gap-[3px] px-1 py-[2px] my-2 rounded justify-center items-center">
          <MessageIcon />
          <div className="text-[9px] text-[#3D6CA1] font-bold">
            New message arrived
          </div>
          <div className="rounded-full bg-[#FF9900C9] text-[7px] font-semibold text-white size-[14px] flex justify-center items-center">
            {messages}
          </div>
        </div>
      ) : (
        <div className="flex  gap-[3px] px-1 py-[2px] m-2 justify-center items-center">
          <MessageIcon />
          <div className="text-[9px] text-[#3D6CA1] font-bold">
            No Notification
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCard;
