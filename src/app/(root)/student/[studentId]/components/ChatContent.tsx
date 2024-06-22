import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import MessageInput from "./MessageInput";
import { ChatData } from "@/helpers/types";

interface ChatContentProps {
  chatData: ChatData;
  overrideClass?:string
}

const ChatContent: React.FC<ChatContentProps> = ({ chatData, overrideClass }) => {
  return (
    <div className="flex flex-col h-full bg-white w-full justify-center items-center border overflow-hidden">
      <div className={cn("flex-1 w-full overflow-y-auto custom__scrollbar px-1 md:px-2 py-4", overrideClass)}>
        <div className="text-center my-2">
          <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded">
            Today
          </span>
        </div>
        <div className="flex flex-col space-y-4">
          {chatData.messages.map((message, index) => (
            <div
              className={cn(
                "flex ",
                message.sender === "mentor" ? "justify-end" : "justify-start"
              )}
              key={index}
            >
              <div>
                <div
                  className={cn(
                    "p-4 rounded-2xl text-sm font-medium max-w-xs",
                    message.sender === "mentor"
                      ? "bg-[#EDE2FD]  border-2 border-white drop-shadow-custom-user-chat"
                      : "bg-white border-2 border-[#D8D5D5] text-black shadow-sm"
                  )}
                >
                  <p>{message.text}</p>
                </div>
                <span className="block text-right font-semibold text-xs pt-1 px-1 text-[#878787]">
                  {message.sender === "mentor"
                    ? "You, "
                    : chatData.studentName + ", "}
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContent;
