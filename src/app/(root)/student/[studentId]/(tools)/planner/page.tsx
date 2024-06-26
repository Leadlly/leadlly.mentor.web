"use client"
import React from 'react'
import Header from '@/components/shared/Header'
import WeekPicker from './components/weekpicker'
import Plannercontent from './components/Plannercontent'
export default function page() {
  const weeksTopics =[
    {
      date: "5 Jan 2024", // Date in YYYY-MM-DD format
      day: "Monday",      // Day number (could be 1 for Monday, 2 for Tuesday, etc.)
      topics: [
        "Limits",
        "continuity",
        "differentiability",
        "Magnetism",
      ],
    },
    {
      date: "6 Jan 2024", // Date in YYYY-MM-DD format
      day: "Tuesday",      // Day number (could be 1 for Monday, 2 for Tuesday, etc.)
      topics: [
        "Limits",
        "continuity",
        "differentiability",
        "Magnetism",
      ],
    },
    {
      date: "7 Jan 2024", // Date in YYYY-MM-DD format
      day: "Wednesday",      // Day number (could be 1 for Monday, 2 for Tuesday, etc.)
      topics: [
        "Limits",
        "continuity",
        "differentiability",
        "Magnetism",
      ],
    },
    {
      date: "8 Jan 2024", // Date in YYYY-MM-DD format
      day: "Thrusday",      // Day number (could be 1 for Monday, 2 for Tuesday, etc.)
      topics: [
        "Limits",
        "continuity",
        "differentiability",
        "Magnetism",
      ],
    },
    {
      date: "9 Jan 2024", // Date in YYYY-MM-DD format
      day: "Friday",      // Day number (could be 1 for Monday, 2 for Tuesday, etc.)
      topics: [
        "Limits",
        "continuity",
        "differentiability",
        "Magnetism",
      ],
    },
    {
      date: "10 Jan 2024", // Date in YYYY-MM-DD format
      day: "Saturday",      // Day number (could be 1 for Monday, 2 for Tuesday, etc.)
      topics: [
        "Limits",
        "continuity",
        "differentiability",
        "Magnetism",
      ],
    },
    {
      date: "11 Jan 2024", // Date in YYYY-MM-DD format
      day: "Sunday",      // Day number (could be 1 for Monday, 2 for Tuesday, etc.)
      topics: [
        "Limits",
        "continuity",
        "differentiability",
        "Magnetism",
      ],
    },
  ]
  return (
    <div className='flex flex-col justify-start h-[calc(100dvh-120px)] gap-3 md:pt-0'>
      <div className='md:bg-[#E8DAFE] md:shadow-none shadow-md shadow-inner-outer pl-[14px] md:pl-[0px] py-[2%] px-[1.8%] md:rounded-[7px] flex md:flex justify-between items-center'>
        <Header
        title="Planner"
        titleClassName="text-[24px] md:text-3xl lg:text-[30px]"
      />
      <WeekPicker/>
      </div>
      <Plannercontent weekstopic={weeksTopics}/>
    </div>
  )
}
