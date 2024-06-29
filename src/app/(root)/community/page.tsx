import React from "react";

import MessageInput from "../student/[studentId]/components/MessageInput";
import { cn } from "@/lib/utils";
import SearchBar from "../(dashboard)/_components/SearchBar";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";



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
        url:"/assets/images/Ellipse 61.png"
    },{
        name:"stella",
        id:2,
        url:"/assets/images/Ellipse 62.png"
    },{
        name:"steve bucks",
        id:3,
        url:"/assets/images/Ellipse 63.png"
    },{
        name:"john musk",
        id:4,
        url:"/assets/images/Ellipse 64.png"
    },{
        name:"stella",
        id:5,
        url:"/assets/images/Ellipse 65.png"
    },{
        name:"steve bucks",
        id:6,
        url:"/assets/images/Ellipse 66.png"
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
      <>
      <div className="lg:flex px-10 hidden overflow-hidden flex-1 gap-3 justify-center flex-grow items-center">
            <div className="w-[30%] border border-gray-200 text-[#676767] h-full flex flex-1 justify-center items-center bg-[#D9D9D947]">
                    <div className="pt-[5%] w-full text-center">
                      <div className="w-full flex justify-center items-center">
                      <Image alt="CLASS" src="/assets/images/class9th.png" width={71} height={71}/>
                      </div>
                     <p className="text-black">Class 9th Group</p>
                     <form>
                     <div className="text-left px-4 ">
                     <p className="text-[#676767] mb-[2%]">Announcement</p>
                     <div className="flex items-center justify-between bg-white border-b-4 rounded-md">
                     <label htmlFor="everyone" className="ml-2 text-[#676767]">Everyone</label>
                     <input type="checkbox" id="everyone" className="mr-2 custom-radio" value="Everyone"/>    
                     </div>
                     <div className="flex items-center justify-between mb-1 bg-white rounded-md">
                     <label htmlFor="everyone" className="ml-2">Select Members</label>
                     <input type="checkbox" id="everyone" className="mr-2 custom-radio" value="Select Members"/>   
                     </div>
                     </div>
                     </form>
                     <div className="w-full text-left px-4 flex flex-col mb-[10px] items-center">
                        <div className="text-left mb-[10px] text-[#676767] w-full">Members</div>
                        <SearchBar className="rounded-[12px] text-[16px] w-[90%] bg-white"/>
                     </div>
                     <div className="px-4 overflow-y-scroll custom__scrollbar h-[40vh]">
                     {
                        studentProfiles.map((profile)=>(
                            <div className="flex items-center justify-between mb-0.5 bg-white border rounded-md min-h-fit"
                            key= {profile.id}
                            >

                        <Image alt="student" width={8} height={8} src={profile.url} className="w-8 h-8 rounded-full ml-2 my-2"/>

                     <label htmlFor="everyone" className="ml-2">{profile.name}</label>
                     <input type="checkbox" id="everyone" className="mr-2 custom-radio " value="Select Members"/>   
                     </div>
                        ))
                     }
                     </div>
                    </div>
            </div>
            <div className="w-[70%] border border-gray-200 text-black flex flex-col justify-between items-center">
            <div className="flex flex-col justify-end w-full items-center overflow-hidden ">
        <ul className="flex justify-center items-center border border-b-[#9654F4DE] bg-primary/10 overflow-hidden shadow-md w-full">
        {chatPageTabs.map((tab)=>(
            <li
            key={tab.id}
            className={cn(
              "relative max-w-max mx-auto cursor-pointer w-full py-3 px-4 md:px-8 text-2xl font-bold",
              activeChatTab === tab.id? "text-[#9654F4DE]" : " text-[#676767] hover:bg-[#caa4ffde] hover:text-[white] cursor-pointer"
            )}>
              {tab.title}
            </li>
  
        ))}
        
        </ul>
                <div className="text-black bg-white w-full h-[60vh] flex justify-between">
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
                    message.sender === "mentor" ? "bg-[#F8F8F8]" : "bg-[#9652f426]"
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

        <div className="border border-gray-200 text-black lg:hidden flex flex-col justify-between items-center">
        <div className="flex flex-col justify-end w-full items-center overflow-hidden ">
    <ul className="flex justify-center items-center border border-b-[#9654F4DE] overflow-hidden shadow-md w-full">
    {chatPageTabs.map((tab)=>(
        <li
        key={tab.id}
        className={cn(
          "relative max-w-max mx-auto cursor-pointer w-full py-3 px-4 md:px-8 text-2xl font-bold",
          activeChatTab === tab.id? "text-[#9654F4DE]" : " text-[#676767] hover:bg-[#caa4ffde] hover:text-[white] cursor-pointer"
        )}>
          {tab.title}
        </li>

    ))}
    
    </ul>
            <div className="text-black bg-[#F6F2FB] h-[calc(100dvh-200px)] w-full flex flex-col text-center items-center justify-center">
            <div className="items-center overflow-y-auto custom__scrollbar px-3 md:px-10 py-4">
              <div className="flex flex-col gap-4 text-center items-center justify-center">
                <p className="bg-[#D8D5D5] text-[12px] rounded-[7px] p-[10px]">Today</p>
                
                <Link href="/community/Announcement" className="rounded-[8px] flex gap-4 p-[10px] text-[18px] text-[#727272] bg-[white]">
                  <p>New Announcement</p>
                  <ArrowRight/>
                </Link>
              </div>
            </div> 
            </div>
            <MessageInput/>
        </div>
        </div></>
        
    )
}

export default page;