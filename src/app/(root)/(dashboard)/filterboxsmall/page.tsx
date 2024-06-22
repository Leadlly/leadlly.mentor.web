"use client"
import React from "react";
import Level from "../_components/Level";
import Efficiency from "../_components/Efficiency";
import EmojiMood from "../_components/EmojiMoodSelector";
import { SlidersHorizontal } from 'lucide-react';
import ArrowIcon from "@/components/icons/ArrowIcon";
import RoundArrowIcon from "@/components/icons/RoundArrowIcon";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const FilterBox = () => {
  const [AscOrder, setAscOrder] = useState<Boolean>(true);
  return (
    <div className="flex flex-col justify-between min-h-[calc(100dvh-140px)] px-4 py-5 ml-[28px] min-w-[200px] text-2xl">
    <div className="flex flex-col items-start gap-3 flex-grow">
      <h2 className="text-[#4D4D4D] text-left w-full text-2xl font-medium">
        Filter Students
      </h2>
      <div className="flex flex-col items-start gap-12 justify-between w-full">
        <Level />
        <Efficiency />
        <EmojiMood />
        <div className="text-black">
          <p className="text-[10px] font-semibold leading-tight">Note:</p>
          <p className="text-[10px] font-regular leading-tight">
            Emoji depict the average mood of a week
          </p>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-8 text-[#7D7D7D] mt-auto">
      <Link href="/" className="bg-[#F1E8FF] rounding-[4px] shadow-md text-[14px] font-medium px-[30px] py-[10px]">Show Changes</Link>
      <button className="bg-[#E2D0FF] rounding-[4px] shadow-md text-[14px] font-medium px-[30px] py-[10px]">Clear Changes</button>
    </div>
  </div>

  );
};

export default FilterBox;
