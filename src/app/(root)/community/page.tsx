import React from "react";

import MessageInput from "../student/[studentId]/components/MessageInput";
import { cn } from "@/lib/utils";
import SearchBar from "../(dashboard)/_components/SearchBar";
import Image from "next/image";


const chatPageTabs = [
    {
      title: "Group Chat",
      id: "chat",
    },
    {
      title: "Conference Meeting",
      id: "meeting",
    },
 
  ];

const studentProfiles =[
    {
        name:"john musk",
        id:1,
        url:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },{
        name:"stella",
        id:2,
        url:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },{
        name:"steve bucks",
        id:3,
        url:"https://images.unsplash.com/photo-1712847333453-740d9665aa5d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },{
        name:"john musk",
        id:4,
        url:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },{
        name:"stella",
        id:5,
        url:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },{
        name:"steve bucks",
        id:6,
        url:"https://images.unsplash.com/photo-1712847333453-740d9665aa5d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
]

const chatData=[
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
        text: "Sure, I`d be happy to help. What specifically do you need assistance with?",
        timestamp: "9:15 AM",
      },
      {
        sender: "user",
        text: "I`m having trouble with the implementation of a feature.",
        timestamp: "9:20 AM",
      },
      {
        sender: "mentor",
        text: "Okay, let`s take a look at your code and debug it together.",
        timestamp: "9:25 AM",
      },
]
 
const activeChatTab = "chat"

const page = () => {
    return (
       
        <div className="flex px-10 overflow-hidden flex-1 gap-3 justify-center flex-grow items-center">
            <div className="w-[30%] border border-gray-200 text-black h-full flex flex-1 justify-center items-center bg-gray-200">
                    <div className="pt-[30%] w-full text-center">
                     Class 9th Group
                     <form>
                     <div className="text-left px-4 ">
                     Announcement
                     <div className="flex items-center justify-between mb-0.5 bg-white border rounded-md">
                     <label htmlFor="everyone" className="ml-2">Everyone</label>
                     <input type="radio" id="everyone" className="mr-2" value="everyone"/>    
                     </div>
                     <div className="flex items-center justify-between mb-1 bg-white border rounded-md">
                     <label htmlFor="everyone" className="ml-2">Select Members</label>
                     <input type="radio" id="everyone" className="mr-2" value="select members"/>    
                     </div>
                     </div>
                     </form>
                     <div className="w-full text-left px-4 flex flex-col items-center">
                        <div className="text-left w-full">Members</div>
                        <SearchBar className="rounded-full w-[90%] mb-2"/>
                     </div>
                     <div className="px-4 overflow-y-scroll h-[40vh]">
                     {
                        studentProfiles.map((profile)=>(
                            <div className="flex items-center justify-between mb-0.5 bg-white border rounded-md min-h-fit"
                            key= {profile.id}
                            >

                        <Image alt="student" src={profile.url} className="w-8 h-8 rounded-full ml-2 my-2"/>

                     <label htmlFor="everyone" className="ml-2">{profile.name}</label>
                     <input type="radio" id="everyone" className="mr-2" value="select members"/>    
                     </div>
                        ))
                     }
                     </div>
                    </div>
            </div>
            <div className="w-[70%] border border-gray-200 text-black flex flex-col justify-between items-center">
            <div className="flex flex-col justify-end w-full items-center overflow-hidden ">
        <ul className="flex justify-center items-center bg-primary/10 overflow-hidden shadow-md w-full">
        {chatPageTabs.map((tab)=>(
            <li
            key={tab.id}
            className={cn(
              "relative max-w-max mx-auto w-full py-3 px-4 md:px-8 text-2xl font-bold border-b-2",
              activeChatTab === tab.id? "text-[#9654F4DE]  border-b-[#9654F4DE]" : " text-black"
            )}>
              {tab.title}
            </li>
  
        ))}
        
        </ul>
                <div className="text-black bg-[#9753f52e] w-full h-[60vh] flex justify-between">
                <div className="flex-1 overflow-y-auto custom__scrollbar px-3 md:px-10 py-4">
                {chatData.map((message, index) => (
            <div
              className={cn(
                "flex mb-2",
                message.sender === "mentor" ? "justify-start" : "justify-end"
              )}
              key={index}>
              <div>
                <div
                  className={cn(
                    "py-2 px-4 rounded-[15px] max-w-sm",
                    message.sender === "mentor" ? "bg-white" : "bg-[#9652f426]"
                  )}>
                  <p>{message.text}</p>
                </div>
                <span className="text-xs text-gray-400 mx-1">
                  {message.sender === "mentor" ? "Mentor, " : "You, "}
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
                </div> 
                </div>
                <MessageInput/>
            </div>
        </div>
        </div>
    )
}

export default page;