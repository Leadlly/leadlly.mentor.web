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
import { Student, Studentinformation } from "@/helpers/types";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { getBackgroundColor } from "@/helpers/constants/efficiency";
import Link from "next/link";
import Progressbar from "@/components/shared/Progressbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StudentCard = ({ studentInfo }: { studentInfo: Studentinformation }) => {
  const studentCurrentMood = studentInfo?.details?.mood;
  const today = new Date().toISOString().split("T")[0];

  const currentDateMoodIndex = studentCurrentMood?.findIndex(
    (mood) => mood.day === today
  );
  const moodOption =
    studentCurrentMood &&
    studentCurrentMood.length &&
    studentCurrentMood?.[currentDateMoodIndex]?.emoji
      ? moodEmojis[
          studentCurrentMood?.[currentDateMoodIndex]
            .emoji as keyof typeof moodEmojis
        ]
      : neutralEmoji;

  const cardBackgroundColor = useMemo(
    () => getBackgroundColor(studentInfo.details.report.dailyReport.overall),
    [studentInfo.details.report.dailyReport.overall]
  );
  return (
    <Link href={`/student/${studentInfo._id}`}>
      <div
        className={cn(
          "flex-grow  bg-slate-500 rounded-2xl justify-center flex p-1 px-2 flex-col items-center",
          cardBackgroundColor
        )}
      >
        <div className="flex flex-col  border-b-[2px] pb-2 border-[#00AF9661] w-full justify-center items-center">
          <div className="flex flex-col mt-[10px] items-center">
            
            <Avatar className="size-8 md:hidden">
              <AvatarImage
                src={studentInfo?.avatar?.url}
                alt={`${studentInfo.firstname}'s avatar`}
              />
              <AvatarFallback>
                <span className="capitalize text-base font-medium">
                  {studentInfo.firstname.charAt(0)}
                </span>
                <span className="capitalize text-base font-medium">
                  {studentInfo.lastname ? studentInfo.lastname.charAt(0) : ""}
                </span>
              </AvatarFallback>
            </Avatar>
            <Avatar className="size-11 hidden md:block">
              <AvatarImage
                src={studentInfo?.avatar?.url}
                alt={`${studentInfo.firstname}'s avatar`}
              />
              <AvatarFallback>
                <span className="capitalize text-base font-medium">
                  {studentInfo.firstname.charAt(0)}
                </span>
                <span className="capitalize text-base font-medium">
                  {studentInfo.lastname ? studentInfo.lastname.charAt(0) : ""}
                </span>
              </AvatarFallback>
            </Avatar>
            <Image
              src={moodOption.moodImg}
              alt="checkbox-label"
              width={20}
              height={20}
              className="md:size-4 w-[10.9px] translate-x-3 -translate-y-2 "
            />
          </div>
          <div className="font-semibold md:text-base text-[10px]">
            {studentInfo.firstname}
          </div>
          <div className="text-[#504F4F] md:text-base text-[10px] font-medium">
            Class: {studentInfo.academic.standard}
          </div>
          <div className="font-semibold md:mb-0 mb-[2%] md:text-base text-[8px] text-[#464646]">
            Level-
            <span className="font-bold text-[#0075FF]">
              {studentInfo.details.level.number
                ? studentInfo.details.level.number
                : 0}
            </span>
          </div>
          <Progressbar
            value={
              studentInfo.details.level.number
                ? studentInfo.details.level.number
                : 0
            }
            indicatorClassName="h-[3px] md:h-[6px]"
          />
        </div>
        {/* {messages ? (
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
        )} */}
      </div>
    </Link>
  );
};

export default StudentCard;
