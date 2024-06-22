import React from "react";
import AttemptedQuiz from "./AttemptedQuiz";

type QuizProps = {
  title: string;
  description: string;
  completionDate: string;
  subject: string;
  status: string;
  numberOfQuestions:number;
  efficiency: number;
};

type AttemptedWeeklyQuizzesProps = {
  attemptedQuizzes: QuizProps[];
};

const AttemptedWeeklyQuizzes = ({ attemptedQuizzes }: AttemptedWeeklyQuizzesProps) => {
  return (
    <div className="border-[2px] w-full border-[#D7D7D7] rounded-xl">
      <div className="capitalize text-[20px] pl-[10%] rounded-t-xl border-b-[2px] border-[#B3B3B3] font-medium py-4 bg-[#FFFFFF] shadow-inner">
        Attempted Quizzes
      </div>
      <div className="overflow-x-scroll w-full horizontal-scrollbar min-h-20 p-5 flex gap-4">
        {attemptedQuizzes.map((quiz, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default AttemptedWeeklyQuizzes;
