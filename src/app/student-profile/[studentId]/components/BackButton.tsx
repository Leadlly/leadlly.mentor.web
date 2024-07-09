"use client"
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const BackButton = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <button
        className="border-[1px] lg:block hidden p-2 border-[#D3D3D3] rounded-[8px] shadow-custom-back"
        onClick={() => router.back()}
      >
        <MoveLeft size={24} color="#5D5D5D" strokeWidth={3} />
      </button>
      <button
        className="border-[1px] top-0 left-0 lg:hidden p-1 border-[#D3D3D3] rounded-[4px] shadow-custom-back"
        onClick={() => router.back()}
      >
        <MoveLeft size={8} color="#5D5D5D" strokeWidth={3} />
      </button>
    </>
  );
};

export default BackButton;
