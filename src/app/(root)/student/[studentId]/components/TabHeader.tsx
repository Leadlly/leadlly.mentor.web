import ChatIcon from "@/components/icons/ChatIcon";
import MeetingIcon from "@/components/icons/MeetingIcon";
import { cn } from "@/lib/utils";
import React from "react";

interface TabHeaderProps {
  activeTab: "chat" | "meeting";
  setActiveTab: (tab: "chat" | "meeting") => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { tab: "chat", label: "Chat", icon: ChatIcon },
    { tab: "meeting", label: "Meeting", icon: MeetingIcon },
  ];

  return (
    <div className="flex">
      {tabs.map(({ tab, label, icon: Icon }) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab as "chat" | "meeting")}
          className={cn(
            "flex-1 py-4 text-center text-l font-semibold justify-center gap-2 flex items-center",
            tab === "chat" ? "rounded-tl-lg" : "rounded-tr-lg",
            activeTab === tab
              ? "bg-[#dbc2ff] text-[#000000]"
              : "bg-[#ede0ff] text-[#56249E] "
          )}
        >
          <Icon
            className={
              (cn("w-4 h-4"),
              activeTab === tab
                ? "fill-[#56249E]"
                : "fill-white")
            }
          />
          {label}
        </button>
      ))}
    </div>
  );
};

export default TabHeader;
