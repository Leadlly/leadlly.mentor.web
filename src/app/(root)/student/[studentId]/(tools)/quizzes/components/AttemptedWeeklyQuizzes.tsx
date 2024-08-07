import React from "react";
import AttemptedQuiz from "./AttemptedQuiz";

type QuizProps = {
  title: string;
  description: string;
  completionDate: string;
  subject: string;
  status: string;
  numberOfQuestions: number;
  efficiency: number;
};

type AttemptedWeeklyQuizzesProps = {
  attemptedQuizzes: QuizProps[];
};

const AttemptedWeeklyQuizzes = ({
  attemptedQuizzes,
}: AttemptedWeeklyQuizzesProps) => {
  return (
    <div className="border-[2px] w-full border-[#D7D7D7] rounded-xl">
      <div className="capitalize text-[20px] pl-4 md:pl-[10%] rounded-t-xl border-b-[2px] border-[#B3B3B3] font-medium py-4 bg-[#FFFFFF] shadow-inner">
        Weekly Quizzes
      </div>
      <div className="overflow-x-auto w-full horizontal-scrollbar min-h-20 p-5 flex  gap-4 md:flex-row flex-col">
        {attemptedQuizzes.length > 0 ? (
          attemptedQuizzes.map((quiz, index) => (
            <AttemptedQuiz
              key={index}
              title={quiz.title}
              description={quiz.description}
              completionDate={quiz.completionDate}
              subject={quiz.subject}
              numberOfQuestions={quiz.numberOfQuestions}
              status={quiz.status}
              efficiency={quiz.efficiency}
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
