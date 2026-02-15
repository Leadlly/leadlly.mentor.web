"use client";
import React, { useState } from "react";
import UnattemptedQuiz from "./UnattemptedQuiz";
import { Quiz } from "@/helpers/types";
import { getFormattedDate } from "@/helpers/utils";

type QuizCardProps = {
  title: string;
  description: string[];
  daysPending: string;
  subject: string;
  status: string;
};

type UnattemptedChapterWiseQuizzesProps = {
  quizzes: Quiz[];
};

const UnattemptedChapterWiseQuizzes = ({
  quizzes,
}: UnattemptedChapterWiseQuizzesProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");

  const subjects = ["All", "Maths", "Physics", "Chemistry"];

  const filteredQuizzes =
    selectedSubject === "All"
      ? quizzes
      : quizzes.filter((quiz) => quiz.subject === selectedSubject);

  return (
    <div className="border-[2px] w-full border-[#D7D7D7] rounded-xl">
      <div className="capitalize text-[20px] pl-4 md:pl-[10%] rounded-t-xl border-b-[2px] border-[#B3B3B3] font-medium py-4 bg-[#FFFFFF] shadow-inner">
        Chapter quiz
      </div>
      <div className="flex flex-wrap md:justify-start justify-center gap-2 pl-4 md:pl-[10%] py-2">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`md:px-4 px-3 py-1 rounded-[7px] font-medium text-xs md:text-sm border-[2px] ${
              selectedSubject === subject
                ? "border-[#575757] bg-[#FBFBFB]"
                : "bg-[#F3F3F3] text-[#919191] border-transparent"
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto w-full horizontal-scrollbar min-h-20 p-5 md:flex-row flex-col flex gap-4">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz, index) => (
            <UnattemptedQuiz
            key={quiz._id}
            title={`${getFormattedDate(new Date(quiz.createdAt))} - ${getFormattedDate(new Date(quiz.endDate))}`} // Display quiz date range as title
            description={Object.keys(quiz.questions).map(key => key.replace(/_/g, " ")).join(" , ")} // Customize description as needed
            subject="Sample Subject" // Replace with actual subject if available
            status={quiz.attempted ? "Completed" : "Not Completed"}
            daysPending={`${Math.max(0, Math.floor((new Date(quiz.createdAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days pending`} // Calculate days pending
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

export default UnattemptedChapterWiseQuizzes;
