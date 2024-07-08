import { getTextColor } from "@/helpers/constants/efficiency";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";

type AttemptedQuizProps = {
  title: string;
  description: string;
  completionDate: string;
  subject: string;
  numberOfQuestions: number;
  status: string;
  efficiency: number;
};

const AttemptedQuiz = ({
  title,
  description,
  completionDate,
  subject,
  numberOfQuestions,
  status,
  efficiency,
}: AttemptedQuizProps) => {
  return (
    <div className="shadow-custom-quiz flex  justify-between gap-1 md:gap-2 rounded-[7px] flex-1 border-[1px] border-[#0000001F] bg-[#ffffff] p-3 md:min-w-[443px] md:max-w-[443px] min-h-[130px] max-h-[150px]">
      <div className="flex flex-col gap-2 md:gap-3">
        <div className="flex justify-between items-center">
          <div className="text-md md:text-lg font-medium flex justify-center md:flex-row flex-col items-center md:gap-3 gap-1">
            <h2>{title}</h2>
            <span className="text-xs text-[#9654F4]">({completionDate})</span>
          </div>
        </div>
        <div className="text-[#525252] text-xs font-normal max-w-48 md:max-w-[300px]">
          <p className="line-clamp-2 md:line-clamp-3">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[#989898] font-medium text-xs">
            {subject}{" "}
            <span className="max-md:hidden">
              {" "}
              - {numberOfQuestions} Quiz Questions
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col  justify-between">
        <div
          className={cn(
            "text-[#4CAF50] font-normal  text-end pr-2 text-[10px] leading-[11px]",
            getTextColor(efficiency)
          )}
        >
          <span className="font-medium ">{efficiency}%</span> Efficiency
        </div>
        <div className="flex flex-col justify-center gap-2 ">
          <div
            className={` text-[10px] md:text-xs  text-center font-semibold rounded-[5px] md:py-[5px] md:px-3 px-2 py-1 ${
              status === "Pending"
                ? "bg-[#9654F4]"
                : "text-[#34C759] border-[2px] font-medium   border-[#34C759]"
            }`}
          >
            {status}
          </div>
          <button className="flex items-center  font-medium text-[10px] md:text-xs border-[2px] md:py-[5px] md:px-3 px-2 py-1 border-[#727272] rounded-[5px]">
            view details
            <div className="size-3 md:size-7">
              <ChevronRight className="size-full" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttemptedQuiz;
