"use client";
import React, { useState } from "react";
import AttemptedQuiz from "./AttemptedQuiz";
import { Quiz } from "@/helpers/types";
import { getFormattedDate } from "@/helpers/utils";

type AttemptedChapterWiseQuizzesProps = {
  attemptedQuizzes: Quiz[];
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
      <div className="capitalize text-[20px] pl-4 md:pl-[10%] rounded-t-xl border-b-[2px] border-[#B3B3B3] font-medium py-4 bg-[#FFFFFF] shadow-inner">
        Chapter quiz
      </div>
      <div className="flex md:justify-start justify-center  gap-2 pl-4 md:pl-[10%] py-2 flex-wrap">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`md:px-4 px-3 py-1 rounded-[7px] font-medium text-xs md:text-sm border-[2px]  ${
              selectedSubject === subject
                ? "border-[#575757] bg-[#FBFBFB]"
                : "bg-[#F3F3F3] text-[#919191] border-transparent"
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto w-full horizontal-scrollbar min-h-20 p-5 flex md:flex-row flex-col gap-4 flex-wrap">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz, index) => (
            <AttemptedQuiz
            key={quiz._id}
            title={`${getFormattedDate(new Date(quiz.createdAt))} - ${getFormattedDate(new Date(quiz.endDate))}`} // Display quiz date range as title
            description={Object.keys(quiz.questions).map(key => key.replace(/_/g, " ")).join(" , ")} // Customize description as needed
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

export default AttemptedChapterWiseQuizzes;
