import ProfileComponent from "./components/Profilecomponent";
import React from "react";

type Params = {
  params: Promise<{ studentId: string }>;
  searchParams: { [key: string]: string | string[] | undefined } | Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ params, searchParams }: Params) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  return (
    <div>
      <ProfileComponent params={resolvedParams} searchParams={resolvedSearchParams} />
    </div>
  );
};

export default Page;
