import Header from "@/components/shared/Header";
import React from "react";
import QuizzTab from "./components/QuizzTab";
import UnattemptedQuizContainer from "./components/UnattemptedQuizContainer";
import AttemptedQuizContainer from "./components/AttemptedQuizContainer";
import { getQuiz } from "@/actions/quiz_actions";

type Params = {
  params: {
    studentId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params: { studentId }, searchParams }: Params) => {
  const activeTab = (searchParams["quiz"] as string) ?? "unattempted";
  const unattemptedQuizzesData = await getQuiz(studentId, "");
  const attemptedQuizzesData = await getQuiz(studentId, "attempted");

  const [unattemptedQuizzes, attemptedQuizzes ] = await Promise.all([unattemptedQuizzesData, attemptedQuizzesData])
  // console.log("this is quiz", attemptedQuizzes, "adn untnete", unattemptedQuizzes)

  return (
    <div className="flex flex-col justify-center h-[calc(100dvh-120px)] max-w-[1120px] gap-3 md:pt-0 mx-auto">
      <div className="bg-[#E8DAFE] py-[0.2%] px-[1.8%] rounded-[7px] flex flex-col">
        <Header
          title="Quizzes"
          titleClassName="text-xl md:text-3xl max-md:hidden lg:text-[24px]"
        />
        <QuizzTab activeTab={activeTab} studentId={studentId} />
      </div>
      <div className="h-full overflow-y-auto custom__scrollbar md:p-3 max-md:p-5 mb-16 md:mb-0">
        {activeTab === "unattempted" && (
          <UnattemptedQuizContainer quizzes={unattemptedQuizzes.weeklyQuiz} />
        )}
        {activeTab === "attempted" && (
          <AttemptedQuizContainer quizzes={attemptedQuizzes.weeklyQuiz} />
        )}
      </div>
    </div>
  );
};

export default Page;
