"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const StudentHeader = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-3 md:px-4 py-2.5 sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-50">
      <div className="flex items-center gap-2">
        <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
          <ChevronLeft className="size-5 text-gray-800" strokeWidth={2.5} />
        </Button>
        <p className="text-lg md:text-2xl font-bold text-gray-900">Student</p>
      </div>
    </div>
  );
};

export default StudentHeader;
