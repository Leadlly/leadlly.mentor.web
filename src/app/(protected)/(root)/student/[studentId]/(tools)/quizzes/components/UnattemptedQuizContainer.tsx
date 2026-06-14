import { Quiz } from "@/helpers/types";

import UnattemptedChapterWiseQuizzes from "./UnattemptedChapterWiseQuizzes";
import UnattemptedWeeklyQuizzes from "./UnattemptedWeeklyQuizzes";

type Props = {
  quizzes: Quiz[];
  chapter: Quiz[];
};

const UnattemptedQuizContainer: React.FC<Props> = ({ quizzes, chapter }) => {
  return (
    <div className="flex flex-col gap-5">
      <UnattemptedWeeklyQuizzes unattemptedQuizzes={quizzes} />
      <UnattemptedChapterWiseQuizzes quizzes={chapter} />
    </div>
  );
};

export default UnattemptedQuizContainer;
