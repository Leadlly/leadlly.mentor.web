import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
import ScheduleMeeting from "./ScheduleMeeting";

const MeetingContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'schedule'>('upcoming');

  const meetings = [
    {
      date: "Wed, 17th April 2024",
      time: "10:00 IST",
      topic: "Vectors and Algebra",
    },
    { date: "Thu, 18th April 2024", time: "11:00 IST", topic: "Calculus" },
    { date: "Fri, 19th April 2024", time: "12:00 IST", topic: "Statistics" },
  ];

  const handleAccept = (meeting: any) => {
    console.log(`Accepted meeting: ${meeting.topic}`);
  };

  const handleReschedule = (meeting: any) => {
    console.log(`Rescheduled meeting: ${meeting.topic}`);
  };

  return (
    <div className="p-3">
      <div className="tabs mb-4 flex justify-between">
      <button
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${
            activeTab === 'upcoming' ? 'text-[#56249E]' : 'text-black hover:border-b-[1px] hover:border-[#56249E]'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Meetings
        </button>
        <button
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${
            activeTab === 'schedule' ? 'text-[#56249E]' : 'text-black hover:border-b-[1px] hover:border-[#56249E]'
          }`}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule Meeting
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'upcoming' && (
          <div>
            {meetings.map((meeting, index) => (
              <MeetingCard
                key={index}
                date={meeting.date}
                time={meeting.time}
                topic={meeting.topic}
                onAccept={() => handleAccept(meeting)}
                onReschedule={() => handleReschedule(meeting)}
              />
            ))}
          </div>
        )}
        {activeTab === 'schedule' && <ScheduleMeeting />}
      </div>
    </div>
  );
};

export default MeetingContent;
