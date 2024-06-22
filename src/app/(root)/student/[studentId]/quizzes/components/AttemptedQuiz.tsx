import { getTextColor } from "@/helpers/constants/efficiency";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";

type AttemptedQuizProps = {
  title: string;
  description: string;
  completionDate: string;
  subject: string;
  numberOfQuestions:number
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
    <div className="shadow-custom-quiz flex  justify-between gap-2 rounded-[7px] border-[1px] border-[#0000001F] bg-[#ffffff] p-3 min-w-[443px] max-w-[443px] min-h-[130px] max-h-[150px]">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium flex justify-center items-center gap-3">
            <h2>{title}</h2>
            <span className="text-xs text-[#9654F4]">({completionDate})</span>
          </div>
        </div>
        <div className="text-[#525252] text-xs font-normal max-w-[300px]">
          <p className="line-clamp-3">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[#989898] font-medium text-xs">
            {subject} - {numberOfQuestions} Quiz Questions
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
            className={` text-xs text-center font-semibold rounded-[5px] py-[5px] px-3 ${
              status === "Pending"
                ? "bg-[#9654F4]"
                : "text-[#34C759] border-[2px] font-medium text-xs  border-[#34C759]"
            }`}
          >
            {status}
          </div>
          <button className="flex items-center font-medium text-xs border-[2px] py-[5px] px-3 border-[#727272] rounded-[5px]">
            view details
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttemptedQuiz;
