import UnattemptedChapterWiseQuizzes from "./UnattemptedChapterWiseQuizzes";
import UnattemptedWeeklyQuizzes from "./UnattemptedWeeklyQuizzes";
import { Quiz } from "@/helpers/types";

type Props = {
  quizzes: Quiz[];
  chapter:Quiz[];
};

const UnattemptedQuizContainer: React.FC<Props> = ({ quizzes,chapter }) => {
  const chapterQuizzes = [
    {
      title: "Jan 05 - Jan 11",
      description:
        "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion, Chemical Bonding",
      dateRange: "Jan 05 - Jan 11",
      daysPending: "Since 2 days",
      topics:
        "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion, Chemical Bonding",
      subject: "Maths",
      status: "Pending",
    },
    {
      title: "Dec 21 - Dec 27",
      description:
        "This is a chemistry quiz covering algebra, geometry, and calculus.",
      dateRange: "Dec 21 - Dec 27",
      daysPending: "2 days pending",
      topics: "Algebra, Geometry, Calculus",
      subject: "Chemistry",
      status: "Pending",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <UnattemptedWeeklyQuizzes unattemptedQuizzes={quizzes} />
      <UnattemptedChapterWiseQuizzes quizzes={chapter} />
    </div>
  );
};

export default UnattemptedQuizContainer;
