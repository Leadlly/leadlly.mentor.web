import FilterBox from "./_components/FilterBox";
import StudentContainer from "./_components/StudentContainer";
import SearchBar from "./_components/SearchBar";
import { getAllStudents } from "@/actions/user_actions";

const page = async () => {
  const allAllottedStudents = await getAllStudents();
  return (
    <div className="flex h-[calc(100dvh-120px)] flex-col md:flex-row w-full gap-5">
      <FilterBox />
      <div className="flex-1 md:mx-0 mx-[14px]">
        <div className="md:hidden">
          <SearchBar />
        </div>
        <StudentContainer students={allAllottedStudents.students} />
      </div>
    </div>
  );
};

export default page;
