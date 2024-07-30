"use client";
import React, { useState } from "react";
import Image from "next/image";
import SearchBar from "@/app/(root)/(dashboard)/_components/SearchBar";
import { useEffect } from "react";
import { getAllStudents } from "@/actions/user_actions";

const Popup = () => {
  const [students, setStudents] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        console.log(data); 
        setStudents(data.students);
        setLoading(false);
      } catch (err) {
        console.error((err as Error).message); 
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      <div className="absolute top-[50%] md:left-[15%] lg:left-[8%] transform -translate-y-1/2 w-[30%] xl:w-[415px] bg-white border border-gray-200 shadow-lg rounded-lg z-40">
        <div className="pt-5 w-full h-[calc(100dvh-120px)] text-center">
          <div className="w-full text-left px-4 flex flex-col mb-[35px] items-center">
            <SearchBar className="rounded-[12px] text-[16px] w-[100%] bg-white" />
          </div>
          <div className="overflow-y-scroll custom__scrollbar">
            {
              students.map((profile:any) => (
                <div className="flex items-center px-[25px] gap-6 mb-0.5 bg-white border-b-2 rounded-md min-h-fit" key={profile.id}>
                {/* <Image alt="student" width={32} height={32} src={} className="w-8 h-8 rounded-full ml-2 my-2" /> */}
                <div className="flex flex-col justify-start">
                  <label htmlFor={`profile-${profile.id}`} className="text-left font-semibold">{profile.firstname}</label>
                  <p className="text-[10px] text-left">MessageText</p>
                </div>
                <div className="flex flex-col items-center ml-auto">
                  <p className="text-red-600 text-[10px]">Tuesday</p>
                  <div className="bg-red-600 text-white rounded-full w-[15px] h-[15px] text-[8px] text-center font-semibold">2</div>
                </div>
              </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
