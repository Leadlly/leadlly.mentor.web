"use client";
import ArrowIcon from "@/components/icons/ArrowIcon";
import RoundArrowIcon from "@/components/icons/RoundArrowIcon";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Students from "./Students";

const StudentContainer = () => {
  const [AscOrder, setAscOrder] = useState<Boolean>(true);
  return (
    <div className=" h-full w-[980px] max-h-[calc(100dvh-140px)] overflow-y-auto min-h-[calc(100dvh-140px)] text-black border-[#D7D7D7] border-[2px] p-4 rounded-3xl flex flex-col gap-5">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-5">
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
        <SearchBar />
      </div>
      <Students />
    </div>
  );
};

export default StudentContainer;
