import React from "react";

import ClassStats from "./components/class-stats";
import SyllabusProgress from "./components/syllabus-progress";
import SyllabusReport from "./components/syllabus-report";

interface PageProps {
  params: Promise<{
    classId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { classId } = await params;
  // Dummy data as requested
  const data = {
    syllabusCompletion: 10,
    chapterCompletion: 5,
    todayDate: "Today - Jan 10",
    topics: [
      { id: "1", name: "Partial Differential Equations" },
      { id: "2", name: "Partial Derivative" },
      { id: "3", name: "Homogeneous Differential Equations" },
    ],
    totalClasses: 20,
    totalTime: 24,
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto py-6">
      {/* Syllabus Section */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Syllabus</h2>
        <div className="flex flex-col gap-4">
          <SyllabusProgress
            syllabusCompletion={data.syllabusCompletion}
            chapterCompletion={data.chapterCompletion}
          />
          <SyllabusReport
            date={data.todayDate}
            topics={data.topics}
            classId={classId}
          />
        </div>
      </section>

      {/* Classes Taken Section */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Classes taken</h2>
        <ClassStats
          totalClasses={data.totalClasses}
          totalTimeHours={data.totalTime}
        />
      </section>
    </div>
  );
};

export default Page;
