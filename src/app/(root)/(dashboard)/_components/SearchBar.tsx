import SearchIcon from "@/components/icons/SearchIcon";
import React from "react";
import { cn } from "@/lib/utils";

interface searchBarProps{
   className?:string,
}
const SearchBar = ({className}:searchBarProps) => {
  return (
    <div className="flex md:mb-0 mb-[2%] md-rounded-none rounded-[1%] justify-start items-center gap-5 shadow-md bg-[#F1F1F1] rounded-md p-[7px] px-5 md:min-w-96">

      <SearchIcon />
      <input
        placeholder="Search by student Name"
        className="outline-none bg-transparent"
      ></input>
    </div>
  );
};

export default SearchBar;
