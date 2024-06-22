import AttemptedChapterWiseQuizzes from "./AttemptedChapterWiseQuizzes";
import AttemptedWeeklyQuizzes from "./AttemptedWeeklyQuizzes";

const attemptedQuizzes = [
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
type Props = {}
const AttemptedQuizContainer = (props: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <AttemptedWeeklyQuizzes attemptedQuizzes={attemptedQuizzes} />
      <AttemptedChapterWiseQuizzes attemptedQuizzes={attemptedQuizzes}/>
    </div>
  );
}
export default AttemptedQuizContainer