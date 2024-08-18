import React from "react";
import UnattemptedQuiz from "./UnattemptedQuiz";
import { Quiz } from "@/helpers/types";

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
              title={`Quiz from ${quiz.startDate} to ${quiz.endDate}`} // Display quiz date range as title
              description={`Quiz type: ${quiz.quizType}`} // Customize description as needed
              daysPending={`${Math.max(0, Math.floor((new Date(quiz.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days pending`} // Calculate days pending
              subject="Sample Subject" // Replace with actual subject if available
              status="Pending"
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
