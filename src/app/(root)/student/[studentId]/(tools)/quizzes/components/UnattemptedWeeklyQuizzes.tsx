import React from "react";
import UnattemptedQuiz from "./UnattemptedQuiz";

type QuizProps = {
  title: string;
  description: string;
  daysPending: string;
  subject: string;
  status: string;
};

type UnattemptedWeeklyQuizzesProps = {
  quizzes: QuizProps[];
};

const UnattemptedWeeklyQuizzes = ({
  quizzes,
}: UnattemptedWeeklyQuizzesProps) => {
  return (
    <div className="border-[2px] w-full border-[#D7D7D7] rounded-xl">
      <div className="capitalize text-[20px] pl-[10%] rounded-t-xl border-b-[2px] border-[#B3B3B3] font-medium py-4 bg-[#FFFFFF] shadow-inner">
        Unattempted Quizzes
      </div>
      <div className="overflow-x-scroll w-full horizontal-scrollbar min-h-20 p-5 flex gap-4">
        {quizzes.map((quiz, index) => (
          <UnattemptedQuiz
            key={index}
            title={quiz.title}
            description={quiz.description}
            daysPending={quiz.daysPending}
            subject={quiz.subject}
            status={quiz.status}
          />
        ))}
      </div>
    </div>
  );
};

export default UnattemptedWeeklyQuizzes;
