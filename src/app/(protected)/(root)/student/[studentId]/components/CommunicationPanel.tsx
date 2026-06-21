"use client";
import React, { useState } from "react";

import MeetingContent from "./MeetingContent";
import TabHeader from "./TabHeader";

const CommunicationPanel = ({ studentId }: { studentId: string }) => {
  const [activeTab, setActiveTab] = useState<"chat" | "meeting">("meeting");

  return (
    <div className="flex grow flex-col h-full border border-gray-300 rounded-[10px] overflow-hidden xl:max-w-[450px] w-full shadow-lg">
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 bg-white overflow-y-auto custom__scrollbar">
        <MeetingContent studentId={studentId} />
      </div>
    </div>
  );
};

export default CommunicationPanel;
