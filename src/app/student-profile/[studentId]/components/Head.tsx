"use client"
import BackButton from "./BackButton";

type Props = {};
function Head({}: Props) {
  return (
    <div className="flex items-center gap-5">
      <div>
        <BackButton />
      </div>
      <h1 className="lg:block hidden text-2xl font-semibold text-black">Student Profile</h1>
    </div>
  );
}
export default Head;
