"use client"
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const BackButton = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <button
        className="border-[1px] lg:block hidden ml-[20px] mt-[5px] p-2 border-[#D3D3D3] rounded-[8px] shadow-custom-back"
        onClick={() => router.back()}
      >
        <MoveLeft size={24} color="#5D5D5D" strokeWidth={3} />
      </button>
      <button
        className="border-[1px] top-[30px] relative left-[15px] lg:hidden p-1 border-[#D3D3D3] rounded-[4px] shadow-custom-back"
        onClick={() => router.back()}
      >
        <MoveLeft size={8} color="#5D5D5D" strokeWidth={3} />
      </button>
    </>
  );
};

export default BackButton;
