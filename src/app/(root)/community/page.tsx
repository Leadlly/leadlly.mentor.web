import React from "react";
import { getAllStudents, getUser } from "@/actions/user_actions";
import CommunityLayout from "./components/CommunityLayout";
import { getUnreadMessage } from "@/actions/chat_action";
import { Studentinformation } from "@/helpers/types";

const Page = async () => {
  try {

    const { students } = await getAllStudents();
    const mentor = await getUser(); 
    const mentorId = mentor.user._id || '';

    const unreadMessagesRequests = students.map((student: Studentinformation) => ({
      receiver: mentorId,
      room: student.email
    }));

    const unreadMessagesResponse = await getUnreadMessage(unreadMessagesRequests);

    const unreadMessagesMap = unreadMessagesResponse.unreadCount.reduce((acc: Record<string, number>, message: any) => {
      acc[message.room] = message.messageCount;
      return acc;
    }, {});

    return (
      <>
        <CommunityLayout students={students} unreadMessagesMap={unreadMessagesMap} />
      </>
    );
  } catch (error) {
    console.error('Error fetching students:', error);
    return <p>Error loading students.</p>;
  }
};

export default Page;
