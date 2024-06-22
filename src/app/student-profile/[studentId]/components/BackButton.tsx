import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
type Props = {};
const BackButton = (props: Props) => {
  const router = useRouter();
  return (
    <button
      className="border-[1px] p-2 border-[#D3D3D3] rounded-[8px] shadow-custom-back"
      onClick={() => router.back()}
    >
      <MoveLeft size={24} color="#5D5D5D" strokeWidth={3} />
    </button>
  );
};
export default BackButton;
