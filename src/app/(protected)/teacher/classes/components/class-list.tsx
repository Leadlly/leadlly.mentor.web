"use client";

import React from "react";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Calculator, FlaskConical, BookOpen, Dna, Monitor, Globe, Hourglass, Presentation, Plus } from "lucide-react";

const getSubjectIcon = (subject: string = "") => {
  const s = subject.toLowerCase();
  if (s.includes("math")) return Calculator;
  if (s.includes("physic") || s.includes("chemist") || s.includes("scienc")) return FlaskConical;
  if (s.includes("english") || s.includes("litera") || s.includes("hindi") || s.includes("langu")) return BookOpen;
  if (s.includes("bio") || s.includes("zoo") || s.includes("botan")) return Dna;
  if (s.includes("comput") || s.includes("it") || s.includes("tech") || s.includes("program")) return Monitor;
  if (s.includes("geo")) return Globe;
  if (s.includes("histor")) return Hourglass;
  return Presentation;
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
      <div className="flex justify-end items-center mb-4 md:mb-6 px-3 md:px-4">
        <AddClassModal />
      </div>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-3 md:px-4">
          {data.map((item: IClassProps | any) => {
            const className = `${item.subject || ""}${item.batch?.name ? ` - ${item.batch.name}` : ""}`;
            return (
              <div key={item._id} className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-200 flex flex-col h-full relative hover:border-purple-300 transition-colors">
                <div className="flex justify-between items-start gap-2 md:gap-3 w-full">
                  <div className="flex gap-3 md:gap-4 items-center flex-1 min-w-0">
                    <div className="bg-blue-600 rounded-xl md:rounded-2xl shrink-0 flex items-center justify-center size-10 md:size-12">
                      {React.createElement(getSubjectIcon(item.subject), { className: "text-white size-5 md:size-6" })}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="text-[15px] md:text-lg font-semibold text-gray-900 truncate w-full capitalize" title={item.subject}>
                        {item.subject || "Unknown Class"}
                      </h3>
                      <p className="text-xs md:text-[13px] text-gray-500 font-medium truncate w-full mt-0.5 capitalize">
                        {item.batch?.name || "No Batch"} • Std {item.batch?.standard || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-purple-50 text-purple-700 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold shrink-0">
                    {item.batch?.students?.length || 0} students
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3 mt-auto pt-4 md:pt-6 w-full">
                  <Link href={`/class/${item._id}?className=${encodeURIComponent(className)}`} className="flex-1">
                    <Button variant="outline" className="w-full rounded-full border-purple-300 text-purple-600 hover:bg-purple-50 hover:text-purple-700 h-10 text-sm font-semibold cursor-pointer">
                      View Class
                    </Button>
                  </Link>
                  <Link href={`/class/${item._id}/add-work?className=${encodeURIComponent(className)}`} className="flex-1">
                    <Button className="w-full rounded-full bg-purple-500 hover:bg-purple-600 text-white h-10 text-sm font-semibold cursor-pointer">
                      <Plus className="size-4 mr-1.5" />
                      Add Work
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
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
