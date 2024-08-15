// pages/report.tsx
// import { FC } from "react";
import DesktopView from "./components/DesktopView";
import Defaultview from "./components/Defaultview";
import { getChapterErrorBook } from "@/actions/errorbook_actions";

const Report = async({params: { studentId, "chapterName.tsx": chapterName }}: { params: { studentId: string, "chapterName.tsx": string }}) => {

  const { chapterErrorBook } = await getChapterErrorBook({
    chapter: chapterName,
    id: studentId
  });

  return (
    <div>
      <div className="hidden xl:block h-full">
        <DesktopView  
        chapterErrorBook={chapterErrorBook}
        chapterName={decodeURIComponent(chapterName)}/>
      </div>

      <div className="h-full block xl:hidden md:pb-4">
        <Defaultview  
        chapterErrorBook={chapterErrorBook}
        chapterName={decodeURIComponent(chapterName)}
        />
      </div>

    </div>
  );
};

export default Report;
