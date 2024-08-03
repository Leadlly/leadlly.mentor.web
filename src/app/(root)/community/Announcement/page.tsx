import React from "react";

import MessageInput from "../../student/[studentId]/components/MessageInput";
import { cn } from "@/lib/utils";
import SearchBar from "../../(dashboard)/_components/SearchBar";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const activeChatTab = "chat";
const studentProfiles = [
  {
    name: "john musk",
    id: 1,
    url: "/assets/images/Ellipse 61.png",
  },
  {
    name: "stella",
    id: 2,
    url: "/assets/images/Ellipse 62.png",
  },
  {
    name: "steve bucks",
    id: 3,
    url: "/assets/images/Ellipse 63.png",
  },
  {
    name: "john musk",
    id: 4,
    url: "/assets/images/Ellipse 64.png",
  },
  {
    name: "stella",
    id: 5,
    url: "/assets/images/Ellipse 65.png",
  },
  {
    name: "steve bucks",
    id: 6,
    url: "/assets/images/Ellipse 66.png",
  },
];

const Announcement = () => {
  return (
    <div className="h-full">
      <div className="mx-[22px] h-[calc(100dvh-100px)]  border border-gray-200 text-[#676767] flex flex-1 justify-center items-center bg-[#D9D9D947]">
        <div className="pt-[5%] w-full text-center">
          <div className="w-full flex justify-center items-center">
            <Image
              alt="CLASS"
              src="/assets/images/class9th.png"
              width={71}
              height={71}
            />
          </div>
          <p className="text-black">Class 9th Group</p>
          <form>
            <div className="text-left px-4 ">
              <p className="text-[#676767] mb-[2%]">Announcement</p>
              <div className="flex items-center justify-between bg-white border-b-4 rounded-md">
                <label htmlFor="everyone" className="ml-2 text-[#676767]">
                  Everyone
                </label>
                <input
                  type="checkbox"
                  id="everyone"
                  className="mr-2 custom-radio"
                  value="Everyone"
                />
              </div>
              <div className="flex items-center justify-between mb-1 bg-white rounded-md">
                <label htmlFor="everyone" className="ml-2">
                  Select Members
                </label>
                <input
                  type="checkbox"
                  id="everyone"
                  className="mr-2 custom-radio"
                  value="Select Members"
                />
              </div>
            </div>
          </form>
          <div className="w-full text-left px-4 flex flex-col mb-[10px] items-center">
            <div className="text-left mb-[10px] text-[#676767] w-full">
              Members
            </div>
            <SearchBar />
          </div>
          <div className="px-4 overflow-y-scroll custom__scrollbar h-[40vh]">
            {studentProfiles.map((profile) => (
              <div
                className="flex items-center justify-between mb-0.5 bg-white border rounded-md min-h-fit"
                key={profile.id}
              >
                <Image
                  alt="student"
                  width={8}
                  height={8}
                  src={profile.url}
                  className="w-8 h-8 rounded-full ml-2 my-2"
                />

                <label htmlFor="everyone" className="ml-2">
                  {profile.name}
                </label>
                <input
                  type="checkbox"
                  id="everyone"
                  className="mr-2 custom-radio "
                  value="Select Members"
                />
              </div>
            ))}
          </div>
          <Link
            rel="stylesheet"
            className="bg-[#E2D0FF] text-[#727272] p-[8px] rounded-[7px]"
            href="/community"
          >
            Done
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
