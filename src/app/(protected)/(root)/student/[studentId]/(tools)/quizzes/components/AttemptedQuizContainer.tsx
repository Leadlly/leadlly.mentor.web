import React from "react";

import { Quiz } from "@/helpers/types";

import AttemptedChapterWiseQuizzes from "./AttemptedChapterWiseQuizzes";
import AttemptedWeeklyQuizzes from "./AttemptedWeeklyQuizzes";

type Props = {
  quizzes: Quiz[];
  chapter: Quiz[];
};

const AttemptedQuizContainer: React.FC<Props> = ({ quizzes, chapter }) => {
  return (
    <div className="flex flex-col gap-5">
      <AttemptedWeeklyQuizzes attemptedQuizzes={quizzes} />
      <AttemptedChapterWiseQuizzes attemptedQuizzes={chapter} />
    </div>
  );
};

export default AttemptedQuizContainer;
