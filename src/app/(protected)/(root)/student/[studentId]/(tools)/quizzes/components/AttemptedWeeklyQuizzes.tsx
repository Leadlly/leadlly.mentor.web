import React from "react";

import { Quiz } from "@/helpers/types";
import { getFormattedDate } from "@/helpers/utils";

import AttemptedQuiz from "./AttemptedQuiz";

type AttemptedWeeklyQuizzesProps = {
  attemptedQuizzes: Quiz[];
};

const AttemptedWeeklyQuizzes: React.FC<AttemptedWeeklyQuizzesProps> = ({
  attemptedQuizzes,
}) => {
  return (
    <div className="border-2 w-full border-[#D7D7D7] rounded-xl">
      <div className="capitalize text-[20px] pl-4 md:pl-[10%] rounded-t-xl border-b-2 border-[#B3B3B3] font-medium py-4 bg-[#FFFFFF] shadow-inner">
        Weekly Quizzes
      </div>
      <div className="overflow-x-auto w-full horizontal-scrollbar min-h-20 p-5 flex gap-4 md:flex-row flex-col">
        {attemptedQuizzes && attemptedQuizzes.length > 0 ? (
          attemptedQuizzes.map((quiz) => (
            <AttemptedQuiz
              key={quiz._id}
              title={`${getFormattedDate(new Date(quiz.createdAt))} - ${getFormattedDate(new Date(quiz.endDate))}`} // Display quiz date range as title
              description={Object.keys(quiz.questions)
                .map((key) => key.replace(/_/g, " "))
                .join(" , ")} // Customize description as needed
              completionDate={quiz.endDate} // Use endDate as completion date
              subject="Sample Subject" // Replace with actual subject if available
              numberOfQuestions={Object.keys(quiz.questions).length} // Count questions from the quiz
              status={quiz.attempted ? "Completed" : "Not Completed"}
              efficiency={quiz.reattempted * 10} // Calculate efficiency or use an available field
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

export default AttemptedWeeklyQuizzes;
