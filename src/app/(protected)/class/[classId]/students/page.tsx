import React from "react";

const Page = async ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = await params;

  return <div>Page</div>;
};

export default Page;
