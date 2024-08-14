import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage, Studentinformation } from "@/helpers/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatTimestamp, getFormattedDate } from "@/helpers/utils";
import { useForm } from "react-hook-form";
import { useSocket } from "@/contexts/socket/socketProvider";
import ScrollToBottom from "react-scroll-to-bottom";
import { Button } from "@/components/ui/button";
import Smile from "@/components/icons/Smile";
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import AttachIcon from "@/components/icons/AttachIcon";
import MicIcon from "@/components/icons/MicIcon";
import SendIcon from "@/components/icons/SendIcon";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/shared/Loader";
import { setUnreadMessages } from "@/redux/slices/unreadMessagesSlice";

interface ChatContentProps {
  selectedStudent: Studentinformation | null;
  chatData: ChatMessage[];
  allStudents: Studentinformation[] | null;
}

const ChatContent = ({
  selectedStudent,
  allStudents,
  chatData,
}: ChatContentProps) => {
  const {socket} = useSocket();
  const mentor = useAppSelector((state) => state.user.user);

  const [messages, setMessages] = useState<ChatMessage[]>(chatData || []);
  const dispatch = useAppDispatch()

  useEffect(() => {
    setMessages(chatData || []);
  }, [chatData]);

  const form = useForm();

  const { reset, handleSubmit, control } = form;

  useEffect(() => {
    if (socket && selectedStudent) {

      socket.emit("mentor_joining_room", { userEmail: selectedStudent?.email });
      socket.on(
        "room_message",
        (data: { message: string; timestamp: string; sendBy: string }) => {
          setMessages((prevMessages) => [...prevMessages, data]);
          console.log("Received mentor room message room event:", data);
        }
      );
      return () => {
        socket.off("room_message");
      };
    } else if (socket && allStudents) {
      socket.on(
        "group_message",
        (data: { message: string; timestamp: string; sendBy: string }) => {
          setMessages((prevMessages) => [...prevMessages, data]);
          console.log("Received mentor room message room event:", data);
        }
      );
      return () => {
        socket.off("room_message");
      };
    }
  }, [socket, allStudents, selectedStudent, messages]);

  useEffect(() => {
    if (socket && mentor && selectedStudent) {
      socket.emit("mentor_open_chat", { userId: mentor._id, room: selectedStudent?.email });
  
      const roomEmail = selectedStudent?.email;
  
      if (roomEmail) {
        dispatch(setUnreadMessages({ room: roomEmail, count: 0 }));
      } else {
        console.warn("Selected student's email is undefined.");
      }
    }
  }, [socket, mentor, selectedStudent, dispatch]);

  const onMessageSubmit = async (data: any) => {
    const formattedData = {
      message: data.content,
      sender: mentor?._id,
      receiver: selectedStudent?._id,
      sendBy: mentor?.firstname,
      room: selectedStudent?.email,
      timestamp: new Date(Date.now()),
      socketId: socket?.id,
    };

    const formattedGroupData = {
      data: allStudents?.map((el) => {
        return {
          receiver: el._id,
          room: el.email,
        };
      }),
      message: data.content,
      sender: mentor?._id,
      sendBy: mentor?.firstname,
      timestamp: new Date(Date.now()),
      socketId: socket?.id,
    };

    try {
      if (socket && selectedStudent) {
        socket.emit("chat_message", formattedData);
      } else if (socket && allStudents) {
        socket.emit("group_chat_message", formattedGroupData);
      }

      reset({ content: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
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

    messages.forEach((message) => {
      const messageDate = new Date(message.timestamp);
      let dateLabel;

      if (messageDate.toDateString() === today.toDateString()) {
        dateLabel = "Today";
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        dateLabel = "Yesterday";
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
    <>
      <div className="w-[70%] border border-gray-200 text-black flex flex-col justify-between items-center">
        <div className="flex flex-col justify-end w-full items-center overflow-hidden">
          <div className="flex justify-center items-center border border-b-[#9654F4DE] bg-primary/10 overflow-hidden shadow-md w-full">
            <div
              className={cn(
                "relative max-w-max mx-auto cursor-pointer w-full py-3 px-4 md:px-8 text-2xl font-bold"
              )}
            >
              {selectedStudent?.firstname || "Select any user to view chat"}
            </div>
          </div>
          <div className="text-black bg-white w-full h-[60vh] flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto custom__scrollbar px-3 md:px-10 py-4">
              <ScrollToBottom
                className="h-[100%]"
                scrollViewClassName="custom__scrollbar"
              >
                {Object.entries(groupedMessages).map(
                  ([dateLabel, messages]) => (
                    <div key={dateLabel}>
                      <div className="text-center text-gray-500 py-2">
                        {dateLabel}
                      </div>
                      {messages.length === 0 ? (
                        <Loader />
                      ) : (
                        messages.map((message, index) => (
                          <div
                            className={cn(
                              "flex ",
                              message.sendBy === mentor?.firstname
                                ? "justify-end"
                                : "justify-start"
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
                                {formatTimestamp(
                                  message?.timestamp ||
                                    new Date(Date.now()).toString()
                                )}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )
                )}
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
        </div>
      </div>
    </>
  );
};

export default ChatContent;
