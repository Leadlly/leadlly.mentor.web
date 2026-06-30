import { getAllStudents } from "@/actions/user_actions";

import FilterBox from "./_components/FilterBox";
import SearchBar from "./_components/SearchBar";
import StudentContainer from "./_components/StudentContainer";

const page = async () => {
  const allAllottedStudents = await getAllStudents();
  return (
    <div className="flex h-[calc(100dvh-80px)] flex-col md:flex-row w-full gap-5 px-4">
      <FilterBox />
      <div className="flex-1 md:mx-0 mx-[14px]">
        <div className="md:hidden">
          <SearchBar />
        </div>
        <StudentContainer students={allAllottedStudents?.students ?? []} />
      </div>
    </div>
  );
};

export default page;
