import React from "react";

import ChapterPlanView from "./syllabus-plan-client";

const Page = async ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = await params;
  return <ChapterPlanView classId={classId} />;
};

export default Page;
