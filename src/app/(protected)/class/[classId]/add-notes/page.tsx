import React from "react";

const Page = async ({ params }: { params: Promise<{ classId: string }> }) => {
  const { classId } = await params;

  return (
    <div className="p-8 text-center text-gray-500 font-medium bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
      Add Notes and DPPs for this class will appear here.
    </div>
  );
};

export default Page;
