"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import MessageInput from "./MessageInput";
import useSocket from "@/hooks/useSocket";
import { useAppSelector } from "@/redux/hooks";
import AttachIcon from "@/components/icons/AttachIcon";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Smile from "@/components/icons/Smile";
import { Textarea } from "@/components/ui/textarea";
import { MicIcon, SendIcon } from "lucide-react";
import { sendMessage } from "@/actions/chat_action";


interface ChatContentProps {
  overrideClass?:string
}
interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
  sendBy: string
}


const ChatContent: React.FC<ChatContentProps> = ({ overrideClass }) => {

  const socket = useSocket();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const userEmail = useAppSelector((state) => state.user.user?.email);

  const form = useForm()
  

  const { reset, handleSubmit, control } = form;

  useEffect(() => {
    if (socket) {
      socket.on('chat_message', (data: { message: string, sender: string, timestamp: string, sendBy: string }) => {
        setMessages(prevMessages => [...prevMessages, data]);
        console.log('Received chat message room event:', data);
      });
      return () => {
        socket.off('chat_message');
      };
    }
  }, [socket]);

  const onMessageSubmit = async (data: any) => {
    console.log(data, "here is th edata sending as message")
    const formattedData = {
      message: data.content,
      email: userEmail,
      sendBy: "mentor"
    };

    try {
      const response = await sendMessage(formattedData);
      console.log(response);
      reset(); // Clear the textarea after sending the message
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  return (
    <div className="flex flex-col h-full bg-white w-full justify-center items-center border overflow-hidden">
      <div className={cn("flex-1 w-full overflow-y-auto custom__scrollbar px-1 md:px-2 py-4", overrideClass)}>
        <div className="text-center my-2">
          <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded">
            Today
          </span>
        </div>
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              className={cn(  
                "flex ",
                message.sendBy === "mentor" ? "justify-end" : "justify-start"
              )}
              key={index}
            >
              <div>
                <div
                  className={cn(
                    "p-4 rounded-2xl text-sm font-medium max-w-xs",
                    message.sendBy === "mentor"
                      ? "bg-[#EDE2FD]  border-2 border-white drop-shadow-custom-user-chat"
                      : "bg-white border-2 border-[#D8D5D5] text-black shadow-sm"
                  )}
                >
                  <p>{message.message}</p>
                </div>
                <span className="block text-right font-semibold text-xs pt-1 px-1 text-[#878787]">
                  {message.sendBy === "mentor"
                    ? "You, "
                    : message.sender + ", "}
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onMessageSubmit)}
          className="flex items-center gap-1 md:gap-3 border rounded-lg bg-white mt-2 md:mx-10 md:my-4 p-2"
        >
          <Button variant={"link"} className="text-black/70 px-2">
            <Smile className="cursor-pointer w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Type a Message here!..."
                    className="resize-none border-none min-h-10 custom__scrollbar outline-none focus:outline-none focus-visible:ring-0 text-base"
                    rows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <Button variant={"link"} className="px-0 pl-2">
              <AttachIcon className="md:w-4 md:h-6" />
            </Button>
            <Button variant={"link"} className="px-0">
              <MicIcon className="md:w-7 md:h-7" />
            </Button>
            <Button type="submit">
              <SendIcon className="md:w-7 md:h-7" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatContent;
