import SearchIcon from "@/components/icons/SearchIcon";
import React from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({className}:SearchBarProps) => {
  
  return (
    <Input
      placeholder="Search by student name"
      icon1={<SearchIcon />}
      className={className ||"border-none focus-visible:ring-0" }
    />
  );
};

export default SearchBar;
