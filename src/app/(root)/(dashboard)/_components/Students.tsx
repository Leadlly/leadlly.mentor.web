"use client"

import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
// import { Student } from "@/helpers/types";
import { getAllStudents } from "@/actions/user_actions";
import Loader from "@/components/shared/Loader";
import { Studentinformation } from "@/helpers/types";
import useSocket from "@/hooks/useSocket";

const Students = ({
  canSelectStudents,
  setCanSelectStudents,
  setStudentIds,
  studentIds,
  students,
}: {
  canSelectStudents: boolean;
  setCanSelectStudents: (canSelectStudents: boolean) => void;
  students: Studentinformation[];
  studentIds: string[];
  setStudentIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {

  const socket = useSocket()

  useEffect(() => {
    if (socket) {
      console.log(socket)
      socket.on("connect", () => {
        // setSocketId(socket.id); // Store the socket ID when connected
        console.log(`Connected with socket ID: ${socket.id}`);
      });
     
      socket.on('join_mentor_room', (data) => {
        console.log('Received join room event:', data);
        socket.emit('join_mentor_room', { userEmail: data.userEmail });
      });
      
     }


    return () => {
      if (socket) {
        socket.off('chat_message');
      }
    };
  }, [socket]);

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 h-[calc(100dvh-120px)] grid-cols-3 lg:gap-[30px] md:gap-[20px] gap-[10px]">
      {students.map((student) => (
        <StudentCard
          key={student._id}
          studentInfo={student}
          setStudentIds={setStudentIds}
          studentIds={studentIds}
          canSelectStudents={canSelectStudents}
          socket={socket}
        />
      ))}
    </div>
  );
};

export default Students;
