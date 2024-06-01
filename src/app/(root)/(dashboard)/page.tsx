import FilterBox from "./_components/FilterBox";
import StudentContainer from "./_components/StudentContainer";

const page = () => {
  return (
    <div className="flex w-full gap-5 ">
      <FilterBox></FilterBox>
      <StudentContainer/>
    </div>
  );
};

export default page;
