import React from "react";
import AttemptedWeeklyQuizzes from "./AttemptedWeeklyQuizzes";
import AttemptedChapterWiseQuizzes from "./AttemptedChapterWiseQuizzes";
import { Quiz } from "@/helpers/types";

type Props = {
  quizzes: Quiz[]; 
};

const AttemptedQuizContainer: React.FC<Props> = ({ quizzes }) => {
  const chapterQuizzes = [
    {
      title: "Dec 03 - Dec 10",
      completionDate: "19 June 2024, at 10:30am",
      description:
        "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion, Chemical Bonding",
      subject: "Maths, Physics, Chemistry",
      numberOfQuestions: 30,
      status: "Completed",
      efficiency: 20,
    },
    
    {
      title: "Dec 03 - Dec 10",
      completionDate: "19 June 2024, at 10:30am",
      description:
        "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion, Chemical Bonding",
      subject: "Maths",
      status: "Completed",
      numberOfQuestions: 30,
      efficiency: 80,
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <AttemptedWeeklyQuizzes attemptedQuizzes={quizzes} />
      <AttemptedChapterWiseQuizzes attemptedQuizzes={chapterQuizzes} />
    </div>
  );
};

export default AttemptedQuizContainer;
