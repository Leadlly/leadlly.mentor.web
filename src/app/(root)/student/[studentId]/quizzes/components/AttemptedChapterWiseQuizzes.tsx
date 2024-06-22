"use client";
import React, { useState } from "react";
import UnattemptedQuiz from "./UnattemptedQuiz";
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

type AttemptedChapterWiseQuizzesProps = {
  attemptedQuizzes: QuizProps[];
};

const AttemptedChapterWiseQuizzes = ({
  attemptedQuizzes,
}: AttemptedChapterWiseQuizzesProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");

  const subjects = ["All", "Maths", "Physics", "Chemistry"];

  const filteredQuizzes =
    selectedSubject === "All"
      ? attemptedQuizzes
      : attemptedQuizzes.filter((quiz) => quiz.subject === selectedSubject);

  return (
    <div className="border-[2px] w-full border-[#D7D7D7] rounded-xl">
      <div className="capitalize text-[20px] pl-[10%] rounded-t-xl border-b-[2px] border-[#B3B3B3] font-medium py-4 bg-[#FFFFFF] shadow-inner">
        Chapter quiz
      </div>
      <div className="flex justify-start gap-2 pl-[10%] py-2">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`px-6 py-1 rounded-[7px] font-medium text-sm border-[2px]  ${
              selectedSubject === subject
                ? "border-[#575757]  bg-[#FBFBFB]"
                : "bg-[#F3F3F3] text-[#919191] border-transparent "
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
      <div className="overflow-x-scroll w-full horizontal-scrollbar min-h-20 p-5 flex gap-4 ">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz, index) => (
            <AttemptedQuiz
              key={index}
              title={quiz.title}
              description={quiz.description}
              numberOfQuestions={quiz.numberOfQuestions}
              completionDate={quiz.completionDate}
              subject={quiz.subject}
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

export default AttemptedChapterWiseQuizzes;
