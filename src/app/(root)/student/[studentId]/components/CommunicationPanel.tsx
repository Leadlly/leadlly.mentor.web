"use client";
import React, { useState } from "react";
import TabHeader from "./TabHeader";
import ChatContent from "./ChatContent";
import MeetingContent from "./MeetingContent";
import { MeetingDataProps } from "@/helpers/types";

const CommunicationPanel = ({
  meetings,
  studentId,
}: {
  meetings: MeetingDataProps[];
  studentId: string;
}) => {
  const [activeTab, setActiveTab] = useState<"chat" | "meeting">("chat");

  return (
    <div className="flex flex-grow flex-col h-full border border-gray-300 rounded-[10px] overflow-hidden max-w-[450px] min-w-[450px]  shadow-lg">
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 bg-white overflow-y-auto custom__scrollbar">
        {activeTab === "chat" ? (
          <ChatContent />
        ) : (
        <MeetingContent meetings={meetings} studentId={studentId} />
       )}
      </div>
    </div>
  );
};

export default CommunicationPanel;
