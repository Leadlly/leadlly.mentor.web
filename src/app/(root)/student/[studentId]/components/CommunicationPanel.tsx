"use client";
import React, { useState } from "react";
import TabHeader from "./TabHeader";
import MeetingContent from "./MeetingContent";
import ChatContent from "./ChatContent";
import { Studentinformation } from "@/helpers/types";

const CommunicationPanel = ({
  student,
  chatData
}: {
  student: Studentinformation;
  chatData: any
}) => {
  const [activeTab, setActiveTab] = useState<"chat" | "meeting">("chat");

  return (
    <div className="flex flex-grow flex-col h-full border border-gray-300 rounded-[10px] overflow-hidden max-w-[450px] min-w-[450px] shadow-lg">
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 bg-white overflow-y-auto custom__scrollbar">
        {activeTab === "chat" ? (
          <ChatContent studentInfo={student} chatData={chatData} />
        ) : (
          <MeetingContent studentId={student._id} />
        )}
      </div>
    </div>
  );
};

export default CommunicationPanel;
