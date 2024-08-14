"use client"
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import AttachIcon from "@/components/icons/AttachIcon";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Smile from "@/components/icons/Smile";
import { Textarea } from "@/components/ui/textarea";
import { MicIcon, SendIcon } from "lucide-react";
import { useSocket } from "@/contexts/socket/socketProvider";
import { ChatMessage, Studentinformation } from "@/helpers/types";
import { formatTimestamp, getFormattedDate } from "@/helpers/utils";
import ScrollToBottom from 'react-scroll-to-bottom';
interface ChatContentProps {
  overrideClass?:string
  studentInfo: Studentinformation | null,
  chatData: {
    messages: ChatMessage[]
  }
}


const ChatContent: React.FC<ChatContentProps> = ({ studentInfo, chatData, overrideClass }) => {

  const {socket} = useSocket();
    const mentor = useAppSelector((state) => state.user.user);

  const [messages, setMessages] = useState<ChatMessage[]>(chatData.messages || []);

  const form = useForm()

  const { reset, handleSubmit, control } = form;


  useEffect(() => {
    if (socket) {
      socket.emit('mentor_joining_room', { userEmail: studentInfo?.email });
      socket.on('room_message', (data: { message: string, timestamp: string, sendBy: string }) => {
        setMessages(prevMessages => [...prevMessages, data]);
        console.log('Received mentor room message room event:', data);
      });
      return () => {
        socket.off('room_message');
      };
    }
  }, [socket, studentInfo?.email]);

  const onMessageSubmit = async (data: any) => {
    console.log(data, "here is th edata sending as message")
    const formattedData = {
      message: data.content,
      sender: mentor?._id,
      receiver: studentInfo?._id,
      sendBy: mentor?.firstname,
      room: studentInfo?.email,
      timestamp: new Date(Date.now()),
      socketId: socket?.id
    };

    try {
      if(socket)
      socket.emit('chat_message', formattedData) 

      reset({ content: "" });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };


  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onMessageSubmit)();
    }
  };

   // Group messages by date
   const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groupedMessages: { [date: string]: ChatMessage[] } = {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    messages.forEach(message => {
      const messageDate = new Date(message.timestamp);
      let dateLabel;

      if (messageDate.toDateString() === today.toDateString()) {
        dateLabel = 'Today';
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        dateLabel = 'Yesterday';
      } else {
        dateLabel = getFormattedDate(messageDate); 
      }

      if (!groupedMessages[dateLabel]) {
        groupedMessages[dateLabel] = [];
      }
      groupedMessages[dateLabel].push(message);
    });

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate(messages);



  return (
    <div className="flex flex-col h-full bg-white w-full justify-center items-center border overflow-hidden">
      <div className={cn("flex-1 w-full overflow-y-auto custom__scrollbar px-1 md:px-2 py-4")}>
        <ScrollToBottom className="h-[100%]" scrollViewClassName="custom__scrollbar">
        {Object.entries(groupedMessages).map(([dateLabel, messages]) => (
            <div key={dateLabel}>
              <div className="text-center text-gray-500 py-2">{dateLabel}</div>
          {messages.map((message, index) => (
            <div
              className={cn(  
                "flex ",
                message.sendBy === mentor?.firstname ? "justify-end" : "justify-start"
              )}
              key={index}
            >
              <div>
                <div
                  className={cn(
                    "p-4 rounded-2xl text-sm font-medium max-w-xs",
                    message.sendBy === mentor?.firstname
                      ? "bg-[#EDE2FD]  border-2 border-white drop-shadow-custom-user-chat"
                      : "bg-white border-2 border-[#D8D5D5] text-black shadow-sm"
                  )}
                >
                  <p>{message.message}</p>
                </div>
                <span className="block text-right font-semibold text-xs pt-1 px-1 text-[#878787]">
                  {message.sendBy === mentor?.firstname
                    ? "You, "
                    : message.sendBy + ", "}
                  {formatTimestamp(message?.timestamp ||  new Date(Date.now()).toString())}
                </span>
              </div>
            </div>
          ))}
          </div>
        ))}

    </ScrollToBottom>
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
                    onKeyDown={handleKeyDown} 
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
