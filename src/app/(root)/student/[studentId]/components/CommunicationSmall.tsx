"use client";
import React, { useState } from "react";
import { XIcon, MessageCircle } from "lucide-react"; // Use your preferred icon library
import TabHeader from "./TabHeader";
import MeetingContent from "./MeetingContent";

const CommunicationPanelSmall = ({ studentId }: { studentId: string }) => {
  const [activeTab, setActiveTab] = useState<"chat" | "meeting">("meeting");
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
  
      <div className="hidden lg:flex fixed right-4 flex-col h-[500px] w-[400px] border border-gray-300 rounded-[10px] shadow-lg z-40">
        <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 bg-white overflow-y-auto custom__scrollbar">
          <MeetingContent studentId={studentId} />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-[15%] right-4 z-50">
        {!isOpen ? (
          <button
            onClick={togglePanel}
            className="p-3 bg-purple-600 text-white rounded-full shadow-lg"
          >
            <MessageCircle size={24} />
          </button>
        ) : (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-300">
              <h2 className="text-lg font-semibold">Communication Panel</h2>
              <button onClick={togglePanel}>
                <XIcon size={24} />
              </button>
            </div>
            <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 bg-white overflow-y-auto custom__scrollbar">
              <MeetingContent studentId={studentId} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommunicationPanelSmall;
