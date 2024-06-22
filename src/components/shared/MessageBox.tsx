"use client";
import { EllipsisVertical } from "lucide-react";
import Avatar from "./Avatar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ChatContent from "@/app/(root)/student/[studentId]/components/ChatContent";
import { motion } from "framer-motion";

type Props = {};

export default function MessageBox({}: Props) {
  const [showMsg, setShowMsg] = useState(false);

  return (
    <motion.div
      className="absolute z-50 bottom-0 right-0 mx-1"
      initial={{ width: "253px", height: "auto", opacity: 1 }}
      animate={{
        width: showMsg ? "433px" : "253px",
        height: showMsg ? "auto" : "auto",
        opacity: showMsg ? 1 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "flex cursor-pointer items-center justify-between shadow-custom-message-box rounded-[8px] px-3 py-2 bg-[#CDAAFF]",
          showMsg ? "rounded-b-none" : ""
        )}
        onClick={() => setShowMsg((sm) => !sm)}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          <Avatar alt="student" />
          <h2>Messaging</h2>
        </div>
        <button className="rounded-full hover:bg-slate-500/20 p-1">
          <EllipsisVertical />
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: showMsg ? 1 : 0, height: showMsg ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ChatContent
          overrideClass={"max-h-[calc(100dvh-300px)]"}
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
                text: "Sure, I'd be happy to help. What specifically do you need assistance with?",
                timestamp: "9:15 AM",
              },
              {
                sender: "user",
                text: "I'm having trouble with the implementation of a feature.",
                timestamp: "9:20 AM",
              },
              {
                sender: "mentor",
                text: "Okay, let's take a look at your code and debug it together.",
                timestamp: "9:25 AM",
              },
            ],
          }}
        />
      </motion.div>
    </motion.div>
  );
}
