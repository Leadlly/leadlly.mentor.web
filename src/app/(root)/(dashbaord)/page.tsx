import Navbar from "@/components/shared/Navbar"
import FilterBox from "./_components/FilterBox"

const page = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="mt-5">
        <FilterBox></FilterBox>
      </div>
    </>
  )
}

export default page