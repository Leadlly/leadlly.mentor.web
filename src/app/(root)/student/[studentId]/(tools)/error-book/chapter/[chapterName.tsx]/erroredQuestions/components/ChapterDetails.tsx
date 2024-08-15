import QuestionIcon from "@/components/icons/Questionicon";

const ChapterDetails = ({
  totalQuestions,
  chapterName,
}: {
  totalQuestions: number;
  chapterName: string;
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center  md:justify-between md:px-20 w-full  max-md:gap-5">
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-start items-start gap-5">
            <div className="flex justify-center items-center gap-3">
              <p className="text-[#9654F4] font-semibold text-xl md:text-3xl capitalize">
                {chapterName}
              </p>
            </div>
            <div className="flex flex-row w-full justify-around text-gray-600 gap-2 md:gap-10">
              <div className="text-[#6C6C6C] text-center font-medium text-md md:text-xl  flex-wrap flex justify-center items-center gap-2">
                <QuestionIcon className="size-6" /> {totalQuestions ?? 0}{" "}
                Questions
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterDetails;
