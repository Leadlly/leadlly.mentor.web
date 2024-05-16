import SearchIcon from "@/components/icons/SearchIcon";
import React from "react";

const SearchBar = () => {
  return (
    <div className="flex justify-start items-center gap-5 shadow-md bg-[#F1F1F1] rounded-md p-[7px] px-5 min-w-96">
      <SearchIcon />
      <input
        placeholder="Search by student Name"
        className="outline-none bg-transparent"
      ></input>
    </div>
  );
};

export default SearchBar;
