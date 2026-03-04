import { InfoCardProps } from "@/helpers/types";
import InfoBox from "./InfoBox";

export default function PersonalInfo({ sections }: InfoCardProps) {
  return (
    <div className="bg-[#E2D0FF45] lg:mx-10 rounded-[7px] p-5 ">
      {sections.map((section, sectionIndex) => (
        <InfoBox items={section.items} key={sectionIndex} title={section.title} />
      ))}
    </div>
  );
}
