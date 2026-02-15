import { ChapterErrorBookProps } from "@/helpers/types";
import BackButton from "./BackButton";
import ChapterDetails from "./ChapterDetails";
import ErroredQuestions from "./ErroredQuestions";


const DesktopView = ({ chapterErrorBook,chapterName }: ChapterErrorBookProps) => {
  return (
    <div className="mx-9">
      <header className="flex items-center py-6">
        <BackButton />
        <h1 className="text-4xl font-semibold text-center flex-grow">Error Book</h1>
      </header>
      <div className="flex flex-col w-full items-start justify-between rounded-[15px] pt-5 border-b bg-[#9654F42E]">
      <ChapterDetails totalQuestions={chapterErrorBook.length} chapterName={chapterName} />
      </div>
      <ErroredQuestions chapterErrorBook={chapterErrorBook} />
    </div>
  );
};

export default DesktopView;
