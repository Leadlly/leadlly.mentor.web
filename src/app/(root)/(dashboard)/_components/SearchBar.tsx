import SearchIcon from "@/components/icons/SearchIcon";
import React from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  return (
    <div className={cn("flex md:mb-0 mb-[2%] justify-start items-center gap-5 shadow-md bg-[#F1F1F1] md:p-[7px] py-[4px] px-5", className)}>
      <SearchIcon />
      <input
        placeholder="Search by student Name"
        className="outline-none bg-transparent"
      />
    </div>
  );
};

export default SearchBar;
