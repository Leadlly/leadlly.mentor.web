"use client"
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const BackButton = (props: Props) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div
      className="border-[1px] p-2 border-[#D3D3D3] bg-white rounded-[8px] shadow-custom-back"
      onClick={handleBackClick}
      role="button"
    >
      <MoveLeft size={24} color="#5D5D5D" strokeWidth={3} />
    </div>
  );
};

export default BackButton;
