import ProfileComponent from "./components/Profilecomponent";
import React from "react";

type Params = {
  params: {
    studentId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ params, searchParams }: Params) => {
  return (
    <div>
      <ProfileComponent params={params} searchParams={searchParams} />
    </div>
  );
};

export default Page;
