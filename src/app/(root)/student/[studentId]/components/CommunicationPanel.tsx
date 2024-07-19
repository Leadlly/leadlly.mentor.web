"use client";
import React, { useState } from "react";
import TabHeader from "./TabHeader";
import ChatContent from "./ChatContent";
import MeetingContent from "./MeetingContent";
import { MeetingDataProps } from "@/helpers/types";

const CommunicationPanel = ({ meetings }: { meetings: MeetingDataProps[] }) => {
  const [activeTab, setActiveTab] = useState<"chat" | "meeting">("chat");

  return (
    <div className="flex flex-grow flex-col h-full border border-gray-300 rounded-[10px] overflow-hidden max-w-[450px] min-w-[450px]  shadow-lg">
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 bg-white overflow-y-auto custom__scrollbar">
        {activeTab === "chat" ? (
          <ChatContent
            chatData={{
              studentName: "John musk",
              messages: [
                {
                  sender: "user",
                  text: "Hello there!",
                  timestamp: "9:00 AM",
                },
                {
                  sender: "mentor",
                  text: "Hi! How can I help you today?",
                  timestamp: "9:05 AM",
                },
                {
                  sender: "user",
                  text: "I need some assistance with my project.",
                  timestamp: "9:10 AM",
                },
                {
                  sender: "mentor",
                  text: "Sure, I`d be happy to help. What specifically do you need assistance with?",
                  timestamp: "9:15 AM",
                },
                {
                  sender: "user",
                  text: "I`m having trouble with the implementation of a feature.",
                  timestamp: "9:20 AM",
                },
                {
                  sender: "mentor",
                  text: "Okay, let`s take a look at your code and debug it together.",
                  timestamp: "9:25 AM",
                },
              ],
            }}
          />
        ) : (
          <MeetingContent meetings={meetings} />
        )}
      </div>
    </div>
  );
};

export default CommunicationPanel;
