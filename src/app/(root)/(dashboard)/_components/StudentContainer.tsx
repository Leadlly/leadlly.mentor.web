"use client";
import ArrowIcon from "@/components/icons/ArrowIcon";
import RoundArrowIcon from "@/components/icons/RoundArrowIcon";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Students from "./Students";

const StudentContainer = () => {
  const [AscOrder, setAscOrder] = useState<Boolean>(true);
  return (
    <div className="md:h-full h-[570px] lg:w-[980px] md:max-h-[calc(100dvh-140px)] md:mt-0 mt-[5%] overflow-y-auto custom__scrollbar md:min-h-[calc(100dvh-140px)] text-black md:border-[#D7D7D7] md:border-[2px] md:p-4 rounded-3xl flex flex-col gap-5">
      <div className="flex items-center justify-between w-full">
        <div className="md:flex gap-5 hidden">
          <p>Sort by</p>
          <button
            id="sort"
            className="flex justify-center gap-1 shadow-md items-center bg-[#F0EEEE] rounded px-2"
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
        <div className="md:block hidden">
          <SearchBar />
        </div>
      </div>
      <Students />
    </div>
  );
};

export default StudentContainer;
