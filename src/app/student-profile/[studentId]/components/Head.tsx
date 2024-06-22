"use client"
import BackButton from "./BackButton";

type Props = {}
function Head({}: Props) {
  return (
    <div className="flex text-2xl font-semibold text-black items-center gap-5">
      <BackButton />
      <h1>Student Profile</h1>
    </div>
  );
}
export default Head