import React from "react";
import MeetingCard from "./MeetingCard";

const MeetingContent: React.FC = () => {
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
    <div className="p-3 ">
      <h2 className="text-lg font-medium mb-4">Upcoming Meetings</h2>
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
  );
};

export default MeetingContent;
