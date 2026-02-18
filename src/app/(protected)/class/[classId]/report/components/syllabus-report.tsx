"use client";

import React from "react";

import Link from "next/link";

import { ChevronRight } from "lucide-react";

interface SyllabusTopic {
  id: string;
  name: string;
}

interface SyllabusReportProps {
  date: string;
  topics: SyllabusTopic[];
  classId: string;
}

const SyllabusReport = ({ date, topics, classId }: SyllabusReportProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 p-1.5 rounded-md">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900">Syllabus Report</h3>
        </div>
        <Link
          href={`/class/${classId}/report/all`}
          className="text-sm text-purple-600 font-medium flex items-center hover:text-purple-700"
        >
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="border border-gray-100 rounded-xl p-4">
        <h4 className="font-medium text-gray-900 mb-3">{date}</h4>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li key={topic.id} className="flex items-start gap-2">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="text-sm text-gray-600">{topic.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SyllabusReport;
