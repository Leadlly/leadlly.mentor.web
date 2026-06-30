import RadialBarChart from "@/components/charts/RadialBarChart";
import { Progress } from "@/components/ui/progress";
import { calculateProgress } from "@/helpers/constants";
import { ISubject } from "@/helpers/types";

const SubjectOverview = ({ subject }: { subject: ISubject | undefined }) => {
  return (
    <div className="rounded-xl shadow-tracker_subject_overview py-4">
      <h2 className="text-lg md:text-2xl leading-none font-semibold text-black mb-4">
        Subject Overview
      </h2>

      <div className="flex flex-col gap-y-3">
        <div className="bg-primary/5 p-4 rounded-2xl flex flex-col gap-4">
          <div>
            <h4 className="leading-none text-sm md:text-lg lg:text-xl font-medium mb-1">
              Revision Completion
            </h4>
            <div className="flex items-center gap-4">
              <Progress
                value={calculateProgress(subject?.overall_progress!)}
                className="h-2 bg-[#EDE5F9]"
                indicatorClassName="bg-primary"
              />
              <p className="leading-none text-sm md:text-lg lg:text-xl font-semibold">
                {Math.round(subject?.overall_progress!)}%
              </p>
            </div>
          </div>
          <div>
            <h4 className="leading-none text-sm md:text-lg lg:text-xl font-medium mb-1">
              Revision Efficiency
            </h4>
            <div className="flex items-center gap-4">
              <Progress
                value={calculateProgress(subject?.overall_efficiency!)}
                className="h-2 bg-[#D3E6EA]"
                indicatorClassName="bg-[#57BDCC]"
              />
              <p className="leading-none text-sm md:text-lg lg:text-xl font-semibold">
                {Math.round(subject?.overall_efficiency!)}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#FDF6E6] p-4 rounded-2xl">
          <h4 className="leading-none text-sm md:text-lg lg:text-xl font-medium mb-4">
            Questions Attempted
          </h4>
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm md:text-lg lg:text-xl font-medium">
                You:
              </div>
              <div className="text-sm md:text-lg lg:text-xl font-semibold">
                {subject?.total_questions_solved.number}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm md:text-lg lg:text-xl font-medium">
                Highest:
              </div>
              <div className="text-sm md:text-lg lg:text-xl font-semibold">
                {subject?.total_questions_solved.number}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Progress
              value={calculateProgress(
                subject?.total_questions_solved.percentage!
              )}
              className="h-2 bg-[#FDE68A]"
              indicatorClassName="bg-[#F1B022]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectOverview;
