"use client"
import FilterBox from "./_components/FilterBox";
import StudentContainer from "./_components/StudentContainer";
import SearchBar from "./_components/SearchBar";

const page = () => {
  return (
    <div className="flex h-[calc(100dvh-120px)] flex-col md:flex-row w-full gap-5">
      <FilterBox />
      <div className="md:mx-0 mx-[14px]">
      <div className="md:hidden">
      <SearchBar className="text-[20px]"/>
      </div>
      <StudentContainer />
      </div>
    </div>
  );
};

export default page;
