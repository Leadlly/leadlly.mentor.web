import { InfoBoxProps } from "@/helpers/types";

type Props = {};
export default function InfoBox({ title, items }: InfoBoxProps) {
  return (
    <div className="p-2 border-b-[#D8D5D5] border-b-2 pb-5 last-of-type:border-0">
      <div className="text-[#9654F4] text-[22px] font-medium">{title}</div>
      <div className="grid grid-cols-3 gap-3 py-4 text-pretty">
        {items.map((item, itemIndex) => (
          <p
            key={itemIndex}
            className=" text-[#424242] text-[18px] font-medium"
          >
            <span className="text-[#656565] font-medium text-[22px] pr-3">
              {item.label}:
            </span>{" "}
            {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}
