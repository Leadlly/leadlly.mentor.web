"use client"

import { Studentinformation } from '@/helpers/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../(dashboard)/_components/SearchBar'
import ChatContent from './ChatContent'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getChat } from '@/actions/chat_action'
import { useAppSelector } from '@/redux/hooks'
import { useSocket } from '@/contexts/socket/socketProvider'

interface CommunityLayoutProps {
    students: Studentinformation[]
}

const CommunityLayout = ({students}: CommunityLayoutProps) => {
 
    const [selectedStudent, setSelectedStudent] = useState<Studentinformation | null>(students[0] || null);
    const [chatData, setChatData] = useState([])
    const mentor = useAppSelector(state => state.user.user)
    const socket = useSocket()
   
     useEffect(() => {
       if (selectedStudent && mentor) {
         // Fetch chat data for the selected student
         
         const fetchChatData = async () => {
           try {
             const data = await getChat({mentorId: mentor?._id, studentId: selectedStudent._id})
             setChatData(data.messages || []);
           } catch (error) {
             console.error('Error fetching chat data:', error);
           }
         };
   
         fetchChatData();
       }
     }, [selectedStudent, mentor]);
   
     const handleClick = (profile: Studentinformation) =>{
        setSelectedStudent(profile)
        if(socket){
            socket.emit('mentor_joining_room', { userEmail: selectedStudent?.email });
        }
     }

     const handleEveryoneClick = () => {
        if (socket) {
          // Extract all student emails
          const userEmails = students.map(student => student.email);
          
          // Emit an event to the server to join all student rooms
          socket.emit('join_group', { userEmails });
        }
        setSelectedStudent(null)
      };

  return (
    <>
        <div className="lg:flex px-10 hidden overflow-hidden flex-1 gap-3 justify-center flex-grow items-center">
          <div className="w-[30%] border border-gray-200 text-[#676767] h-full flex flex-1 justify-center items-center bg-[#D9D9D947]">
            <div className="pt-[5%] w-full text-center">
              <div className="w-full flex justify-center items-center">
                <Image alt="CLASS" src="/assets/images/class9th.png" width={71} height={71} />
              </div>
              <p className="text-black">Class 9th Group</p>
              <form>
                <div className="text-left px-4">
                  <p className="text-[#676767] mb-[2%]">Announcement</p>
                  <div className="flex items-center justify-between bg-white border-b-4 rounded-md">
                    <label htmlFor="everyone" className="ml-2 text-[#676767]">Everyone</label>
                    <input type="checkbox" id="everyone" className="mr-2 custom-radio" 
                    value="Everyone" 
                    // onClick={handleEveryoneClick} 
                    />
                  </div>
                  <div className="flex items-center justify-between mb-1 bg-white rounded-md">
                    <label htmlFor="select-members" className="ml-2">Select Members</label>
                    <input type="checkbox" id="select-members" className="mr-2 custom-radio" value="Select Members" />
                  </div>
                </div>
              </form>
              <div className="w-full text-left px-4 flex flex-col mb-[10px] items-center">
                <div className="text-left mb-[10px] text-[#676767] w-full">Members</div>
                <SearchBar className="rounded-[12px] text-[16px] w-[90%] bg-white" />
              </div>
              <div className="px-4 overflow-y-scroll custom__scrollbar h-[40vh]">
                {students && students.length > 0 ? (
                  students.map((profile: Studentinformation) => (
                    <div className="flex items-center mb-0.5 bg-white border rounded-md min-h-fit p-2 hover:bg-gray-100 hover:cursor-pointer" 
                    key={profile._id} 
                    onClick={() => handleClick(profile)}>
                   <Avatar className="size-8 rounded-full bg-[#9fcfff] mr-6">
  {profile?.avatar?.url ? (
    <Image src={profile.avatar.url} alt={`${profile.firstname}'s avatar`} width={50} height={50} />
  ) : (
    <AvatarFallback>
      <span className="capitalize text-base font-medium">
        {profile.firstname.charAt(0)}
      </span>
      <span className="capitalize text-base font-medium">
        {profile.lastname ? profile.lastname.charAt(0) : ""}
      </span>
    </AvatarFallback>
  )}
</Avatar>
                      <label htmlFor={`student-${profile._id}`} className="">{profile.firstname}</label>
                      {/* <input type="checkbox" id={`student-${profile._id}`} className="mr-2 custom-radio" value="Select Members" /> */}
                    </div>
                  ))
                ) : (
                  <p>No students available.</p>
                )}
              </div>
            </div>
          </div>
          <ChatContent selectedStudent={selectedStudent} chatData={chatData}/>
        </div>

        {/* <div className="border border-gray-200 text-black lg:hidden flex flex-col justify-between items-center">
          <div className="flex flex-col justify-end w-full items-center overflow-hidden">
            <ul className="flex justify-center items-center border border-b-[#9654F4DE] overflow-hidden shadow-md w-full">
              {chatPageTabs.map((tab) => (
                <li
                  key={tab.id}
                  className={cn(
                    "relative max-w-max mx-auto cursor-pointer w-full py-3 px-4 md:px-8 text-2xl font-bold",
                    activeChatTab === tab.id ? "text-[#9654F4DE]" : "text-[#676767] hover:bg-[#caa4ffde] hover:text-[white] cursor-pointer"
                  )}
                >
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
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <MessageInput />
          </div>
        </div> */}
      </>
  )
}

export default CommunityLayout