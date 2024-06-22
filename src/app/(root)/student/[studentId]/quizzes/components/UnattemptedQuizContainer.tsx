
import UnattemptedChapterWiseQuizzes from "./UnattemptedChapterWiseQuizzes";
import UnattemptedWeeklyQuizzes from "./UnattemptedWeeklyQuizzes";

const quizzes = [
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
type Props = {}
const UnattemptedQuizContainer = (props: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <UnattemptedWeeklyQuizzes quizzes={quizzes} />
      <UnattemptedChapterWiseQuizzes quizzes={quizzes} />
    </div>
  );
}
export default UnattemptedQuizContainer