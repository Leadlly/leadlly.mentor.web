import React from "react";

type UnattemptedQuizProps = {
  title: string;
  description: string;
  daysPending: string;
  subject: string;
  status: string;
};

const UnattemptedQuiz = ({
  title,
  description,
  daysPending,
  subject,
  status,
}: UnattemptedQuizProps) => {
  return (
    <div className="shadow-custom-quiz flex flex-col justify-between gap-2 rounded-[7px] border-[1px] border-[#0000001F] bg-[#ffffff] p-3 min-w-[587px] max-w-[587px]  min-h-[130px] max-h-[150px]">
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium">
          <h2>{title}</h2>
        </div>
        <div className="text-[#E55426] font-medium text-[9.4px] leading-[10.95px]">
          {daysPending}
        </div>
      </div>
      <div className="text-[#525252] text-sm font-normal max-w-[450px]">
        <p className="line-clamp-3">{description}</p>
      </div>
      <div className="flex justify-between items-center ">
        <div className="bg-[#A36AF53D] text-xs rounded-[4px] px-[7px] py-[3px]">
          {subject}
        </div>
        <div
          className={`bg-[#9654F4] text-white text-xs font-semibold rounded-[5px] py-[5px] px-3 ${status === "Pending" ? "bg-[#9654F4]" : "bg-[#4CAF50]"}`}
        >
          {status}
        </div>
      </div>
    </div>
  );
};

export default UnattemptedQuiz;
