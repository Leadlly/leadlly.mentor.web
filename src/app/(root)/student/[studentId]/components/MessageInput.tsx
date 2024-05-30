import AttachIcon from "@/components/icons/AttachIcon";
import MicIcon from "@/components/icons/MicIcon";
import SendIcon from "@/components/icons/SendIcon";
import Smile from "@/components/icons/Smile";
import React from "react";

const MessageInput: React.FC = () => {
  return (
    <div className="flex items-center gap-1 md:gap-3 border rounded-lg bg-white mt-2 md:mx-2 md:my-4 p-2">
      <button className="text-black/70 px-2">
        <Smile className="cursor-pointer size-4" />
      </button>
      <input
        type="text"
        placeholder="Type a Message here!..."
        className="flex-1 bg-transparent border-l pl-2 border-l-[#DDDDDD] outline-none"
      />
      <div className="flex items-center gap-4">
        <button className="px-0">
          <AttachIcon className="md:w-4 md:h-7" />
        </button>
        <button className="px-0">
          <MicIcon className="md:w-7 md:h-7" />
        </button>
        <button type="submit" className="bg-[#6298D5] py-1 px-2 rounded">
          <SendIcon className="md:w-7 md:h-7" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
