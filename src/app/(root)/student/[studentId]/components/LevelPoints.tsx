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
        "rounded-full shadow-custom-point bg-[#F4F4F4] p-3 w-[62px] h-[62px] flex flex-col justify-center items-center",
        "md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px]" // Responsive widths and heights
      )}
    >
      <div className="flex items-center justify-between md:justify-around w-full">
        <div className="md:block hidden">
          <Image
            src={iconImageSrc}
            alt={iconAltText}
            width={pointsText === "Streak" ? 11 : 14}
            height={pointsText === "Streak" ? 11 : 14}
            className={cn("shadow-lg", iconShadowColor)}
          />
        </div>
        <div className="md:hidden block">
          <Image
            src={iconImageSrc}
            alt={iconAltText}
            width={pointsText === "Streak" ? 7 : 9}
            height={pointsText === "Streak" ? 7 : 9}
            className={cn("shadow-lg", iconShadowColor)}
          />
        </div>
        <ChevronRightIcon
          width={12}
          height={12}
          className={cn(
            "rounded-full border-none p-[2px] hidden md:block",
            chevronBgColor
          )}
        />
      </div>

      <div className="flex flex-col justify-start items-center mt-2 md:mt-3">
        <p className="text-[8px] md:text-[10px] lg:text-sm font-medium text-[#6B6B6B]">
          {pointsText}
        </p>
        <h3
          className={cn(
            "leading-[0.5] text-[9.4px] md:text-base font-semibold",
            pointsColor
          )}
        >
          {points}
        </h3>

        <Progressbar
          value={progressValue}
          progressClassName="w-[30px] h-[2px] md:w-[46px] md:h-[4px]"
          indicatorClassName={progressIndicatorBg}
        />

        {pointsText !== "Streak" && (
          <div className="flex items-center gap-1 mt-1">
            <RoundArrowIcon
              stroke={progressIconStroke}
              className="rotate-180"
            />
            <span
              className={cn(
                "text-[6px] md:text-[9px] font-bold",
                pointsProgressTextColor
              )}
            >
              {pointsProgressText}
            </span>
          </div>
        )}

        {pointsText === "Streak" && (
          <>
            <div className="w-full text-[6px] md:text-[7.5px] text-black font-semibold flex items-center justify-center gap-1 mb-1">
              <span>Jan12</span>
              <span>Feb12</span>
            </div>

            <p className="text-[5px] md:text-[7.5px] text-black font-semibold -mt-1">
              Good Work!
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LevelPoints;
