"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Share2, Plus, Calculator, FlaskConical, BookOpen, Dna, Monitor, Globe, Hourglass, Presentation } from "lucide-react";

const getSubjectIcon = (subject: string = "") => {
  const s = subject.toLowerCase();
  if (s.includes("math")) return Calculator;
  if (s.includes("physic") || s.includes("chemist") || s.includes("scienc")) return FlaskConical;
  if (s.includes("english") || s.includes("litera") || s.includes("hindi") || s.includes("langu")) return BookOpen;
  if (s.includes("bio") || s.includes("zoo") || s.includes("botan")) return Dna;
  if (s.includes("comput") || s.includes("it") || s.includes("tech") || s.includes("program")) return Monitor;
  if (s.includes("geo")) return Globe;
  if (s.includes("histor")) return Hourglass;
  return Presentation; // fallback
};

import { getAllClasses } from "@/actions/batch_actions";
import { IClassProps } from "@/helpers/types";
import { Button } from "@/components/ui/button";
import { AddClassModal } from "./add-class-modal";

const ClassList = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["all-classes"],
    queryFn: getAllClasses,
  });

  return (
    <>
      <div className="flex justify-between items-center mb-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Classes</h1>
        <AddClassModal />
      </div>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {data.map((item: IClassProps | any) => (
            <div
              key={item._id}
              className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col h-full relative hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-3 w-full">
                <div className="flex gap-3 items-center flex-1 min-w-0">
                  <div className="bg-blue-600 rounded-full shrink-0 flex items-center justify-center size-[48px] shadow-sm">
                    {React.createElement(getSubjectIcon(item.subject), { className: "text-white size-6" })}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-[18px] lg:text-[19px] font-bold text-gray-900 truncate w-full capitalize" title={item.subject}>
                      {item.subject || "Unknown Class"}
                    </h3>
                    <p className="text-[13px] text-gray-500 font-semibold truncate w-full mt-0.5 capitalize">
                      {item.batch?.name || "No Batch"} • Std {item.batch?.standard || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full text-[12px] font-bold shrink-0 shadow-sm border border-purple-200">
                  {item.batch?.students?.length || 480} students
                </div>
              </div>

              <div className="flex items-center gap-3 mt-auto pt-8 w-full">
                <Link
                  href={`/class/${item._id}`}
                  className="flex-1 min-w-0"
                >
                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl border border-purple-200 text-purple-600 hover:bg-purple-50 h-[44px] text-sm font-bold transition-all px-2 shadow-sm"
                  >
                    View Class
                  </Button>
                </Link>

                <Button 
                  className="flex-1 min-w-0 rounded-xl bg-purple-600 hover:bg-purple-700 text-white h-[44px] text-sm font-bold transition-all px-2 shadow-sm pointer-events-none"
                >
                  <Plus className="size-4 mr-1 shrink-0" />
                  <span className="truncate">Add Work</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[400px] flex items-center justify-center text-center text-gray-500 font-medium text-lg bg-gray-50 rounded-[24px] mx-4 border border-dashed border-gray-200">
          No classes found. Create one to get started!
        </div>
      )}
    </>
  );
};

export default ClassList;
