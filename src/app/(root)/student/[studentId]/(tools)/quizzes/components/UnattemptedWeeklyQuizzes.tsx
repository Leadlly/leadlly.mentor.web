import React from "react";
import UnattemptedQuiz from "./UnattemptedQuiz";
import { Quiz } from "@/helpers/types";
import { getFormattedDate } from "@/helpers/utils";

type UnattemptedWeeklyQuizzesProps = {
  unattemptedQuizzes: Quiz[];
};

const UnattemptedWeeklyQuizzes: React.FC<UnattemptedWeeklyQuizzesProps> = ({
  unattemptedQuizzes,
}) => {

  return (
    <div className="border-[2px] w-full border-[#D7D7D7] rounded-xl">
      <div className="capitalize text-[20px] pl-4 md:pl-[10%] rounded-t-xl border-b-[2px] border-[#B3B3B3] font-medium py-4 bg-[#FFFFFF] shadow-inner">
        Unattempted Weekly Quizzes
      </div>
      <div className="overflow-x-auto w-full horizontal-scrollbar min-h-20 p-5 flex gap-4 md:flex-row flex-col">
        {unattemptedQuizzes.length > 0 ? (
          unattemptedQuizzes.map((quiz) => (
            <UnattemptedQuiz
              key={quiz._id}
              title={`${getFormattedDate(new Date(quiz.createdAt))} - ${getFormattedDate(new Date(quiz.endDate))}`} // Display quiz date range as title
              description={Object.keys(quiz.questions).map(key => key.replace(/_/g, " ")).join(" , ")} 
              daysPending={`${Math.max(0, Math.floor((new Date(quiz.createdAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days pending`} // Calculate days pending
              subject="Sample Subject" 
              status={quiz.attempted ? "Completed" : "Pending"}
            />
          ))
        ) : (
          <div className="text-center w-full font-medium text-lg text-gray-500">
            No Quizzes
          </div>
        )}
      </div>
    </div>
  );
};

export default UnattemptedWeeklyQuizzes;
