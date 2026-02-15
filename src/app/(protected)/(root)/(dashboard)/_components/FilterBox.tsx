"use client";

import React from "react";
import Level from "./Level";
import Efficiency from "./Efficiency";
import EmojiMood from "./EmojiMoodSelector";
import { SlidersHorizontal } from "lucide-react";
import ArrowIcon from "@/components/icons/ArrowIcon";
import RoundArrowIcon from "@/components/icons/RoundArrowIcon";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const FilterBox = () => {
  const [AscOrder, setAscOrder] = useState<Boolean>(true);
  return (
    <div>
      <div className="hidden md:block">
        <div className="bg-box py-5 h-full min-h-[calc(100dvh-140px)] shadow-lg rounded-3xl min-w-[200px] flex flex-col items-start gap-8 text-2xl">
          <h2 className="text-[#4D4D4D] text-center w-full text-2xl font-bold">
            Filter Students
          </h2>
          <div className="flex px-4 flex-col items-center gap-4 justify-between w-full">
            <Level />
            <Efficiency />
            <EmojiMood />
            <div className="text-black">
              <h4 className="text-[10px] font-bold">Note:</h4>
              <p className="text-[10px] font-medium">
                Emoji depict the average mood of a week
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="bg-box py-[4px] shadow-lg min-w-[200px] flex flex-col gap-8 text-2xl">
          <Link
            href="/filterboxsmall"
            className="text-[#4D4D4D] text-center flex items-center justify-center gap-2 w-full text-[16px] font-regular"
          >
            <p>Filter</p>
            <SlidersHorizontal className="w-[16px]" />
            <div className="flex gap-5">
              <p>Sort by</p>
              <button
                id="sort"
                className="flex justify-center gap-1 shadow-md items-center bg-[#F0EEEE] text-[9px] md:text-[12px] rounded px-2"
                onClick={() => {
                  setAscOrder((order) => !order);
                }}
              >
                A<ArrowIcon />Z
                <RoundArrowIcon
                  stroke="#6200EE"
                  className={
                    AscOrder ? "translate-y-1 " : "rotate-180 translate-y-0"
                  }
                />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
