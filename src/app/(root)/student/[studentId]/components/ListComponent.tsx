"use client";
import React, { useState } from "react";
import SearchBar from "@/app/(root)/(dashboard)/_components/SearchBar";
import { useEffect } from "react";
import { getAllStudents } from "@/actions/user_actions";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import Loader from "@/components/shared/Loader";

const Popup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [students, setStudents] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const data = await getAllStudents();
        setStudents(data.students);
      } catch (err) {
        console.error((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="absolute text-black top-[50%] md:left-[15%] lg:left-[8%] transform -translate-y-1/2 w-[30%] xl:w-[415px] bg-white border border-gray-200 shadow-lg rounded-lg z-40 overflow-auto custom__scrollbar">
        <div className="pt-5 w-full h-[calc(100dvh-120px)] text-center">
          <div className="w-full text-left px-4 flex flex-col mb-[12px] items-center">
            <SearchBar className="rounded-[12px] text-[16px] w-[100%] bg-white" />
          </div>
          <div className="overflow-y-scroll custom__scrollbar">
            {
              students.map((profile:any) => (
              <Link href={`/student/${profile._id}`} className="flex items-center p-2 px-[25px] gap-6 mb-0.5 bg-white border-b rounded-md min-h-fit" key={profile.id}>
              <Avatar className="size-8 rounded-full bg-[#9fcfff] md:hidden">
              <AvatarImage
                src={profile?.avatar?.url}
                alt={`${profile.firstname}'s avatar`}
              />
              <AvatarFallback>
                <span className="capitalize text-base font-medium">
                  {profile.firstname.charAt(0)}
                </span>
                <span className="capitalize  text-base font-medium">
                  {profile.lastname ? profile.lastname.charAt(0) : ""}
                </span>
              </AvatarFallback>
            </Avatar>

              <Avatar className="size-11 rounded-full bg-[#cdaaff] hidden md:flex items-center justify-center">
              <AvatarImage
                src={profile?.avatar?.url}
                alt={`${profile.firstname}'s avatar`}
                className=""
              />
              <AvatarFallback className="flex items-center justify-center">
                <span className="capitalize text-base font-medium">
                  {profile.firstname.charAt(0)}
                </span>
                <span className="capitalize text-base font-medium">
                  {profile.lastname ? profile.lastname.charAt(0) : ""}
                </span>
              </AvatarFallback>
            </Avatar>
                <div className="flex flex-col justify-start">
                  <label
                    htmlFor={`profile-${profile._id}`}
                    className="text-left font-semibold"
                  >
                    {profile.firstname}
                  </label>
                  <p className="text-[10px] text-left">MessageText</p>
                </div>
                {/* <div className="flex flex-col items-center ml-auto">
                  <p className="text-red-600 text-[10px]">Tuesday</p>
                  <div className="bg-red-600 text-white rounded-full w-[15px] h-[15px] text-[8px] text-center font-semibold">2</div>
                </div> */}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
