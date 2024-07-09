"use client"
import BackButton from "./BackButton";

type Props = {};
function Head({}: Props) {
  return (
    <>
    <div className="lg:flex hidden items-center gap-5">
      <div className="">
        <BackButton />
      </div>
      <h1 className="lg:block hidden text-2xl font-semibold text-black">Student Profile</h1>
    </div>
    
    <div className="lg:hidden">
    <BackButton />
      </div></>
    
  );
}
export default Head;
