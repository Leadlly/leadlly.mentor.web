import React from "react";

import ClassTab from "./components/class-tab";

const ClassLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-3 max-w-7xl mx-auto min-h-screen flex flex-col items-start">
      <ClassTab />
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
};

export default ClassLayout;
