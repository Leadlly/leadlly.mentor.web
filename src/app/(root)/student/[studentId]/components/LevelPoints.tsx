
import ArrowIcon from "@/components/icons/ArrowIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import RoundArrowIcon from "@/components/icons/RoundArrowIcon";
import Progressbar from "@/components/shared/Progressbar";

import { TLevelPointProps } from "@/helpers/types";
import { cn } from "@/lib/utils";

import Image from "next/image";
import React from "react";

const LevelPoints = ({
  cardBgColor,
  iconImageSrc,
  iconAltText,
  iconShadowColor,
  chevronBgColor,
  pointsColor,
  points,
  pointsText,
  progressValue,
  pointsProgressText,
  pointsProgressTextColor,
  progressIndicatorBg,
  progressIconStroke,
}: TLevelPointProps) => {
  return (
    <div
      className={cn(
        " rounded-full w-[90px] shadow-custom-point bg-[#F4F4F4] p-3 h-[90px] flex flex-col justify-center"
      )}
    >
      <div className="flex items-center justify-around">
        <Image
          src={iconImageSrc}
          alt={iconAltText}
          width={pointsText === "Streak" ? 11 : 14}
          height={pointsText === "Streak" ? 11 : 14}
          className={cn("shadow-lg", iconShadowColor)}
        />

        <ChevronRightIcon
          width={12}
          height={12}
          className={cn("rounded-full border-none p-[2px]", chevronBgColor)}
        />
      </div>

      <div className=" flex flex-col justify-start items-center ">
        <p className="text-[10px]  font-medium text-[#6B6B6B]">{pointsText}</p>
        <h3 className={cn("leading-[0.5] text-base font-semibold", pointsColor)}>
          {points}
        </h3>

        <Progressbar
          value={progressValue}
          progressClassName='w-[46px] h-[4px]'
          indicatorClassName={progressIndicatorBg}
        />

        {pointsText !== "Streak" && (
          <div className="flex items-center gap-[2px]">
            <RoundArrowIcon stroke={progressIconStroke } className="rotate-180"/>
            <span
              className={cn(
                "text-[9px] font-bold mt-[0.5px]",
                pointsProgressTextColor
              )}
            >
              {pointsProgressText}
            </span>
          </div>
        )}

        {pointsText === "Streak" && (
          <>
            <div className=" w-full text-[5.5px] text-black font-semibold flex items-center justify-center gap-1 mb-1">
              <span>Jan12</span>
              <span>Feb12</span>
            </div>

            <p className="text-[7.5px] text-black font-semibold -mt-1">
              Good Work!
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LevelPoints;