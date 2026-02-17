"use client";

import React, { useState } from "react";

import TabNavItem from "@/components/shared/TabNavItem";

const tabItems = [
  {
    id: "10th",
    title: "Std 10th",
  },
  {
    id: "12th",
    title: "Std 12th",
  },
  {
    id: "13th",
    title: "Std 13th",
  },
];

const SyllabusFinished = () => {
  const [activeTab, setActiveTab] = useState("10th");

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-semibold">Syllabus Finished</h3>

      <ul className="flex items-center gap-1 w-max">
        {tabItems.map((tab) => (
          <TabNavItem
            key={tab.id}
            title={tab.title}
            id={tab.id}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            layoutIdPrefix="syllabus_finished"
            activeTabClassName="h-full inset-0"
          />
        ))}
      </ul>
    </div>
  );
};

export default SyllabusFinished;
