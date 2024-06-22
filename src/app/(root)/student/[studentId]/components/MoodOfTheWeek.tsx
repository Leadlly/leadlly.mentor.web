
import { moodEmojis } from "@/helpers/constants/moodEmojis";
import Image from "next/image";
import React from "react";

const MoodOfTheWeek = () => {
  const moodData = [
    { day: "Mon", mood: "neutral" },
    { day: "Tue", mood: "smiling" },
    { day: "Wed", mood: "sad" },
    { day: "Thu", mood: "smiling" },
    { day: "Fri", mood: "laughing" },
    { day: "Sat", mood: "unhappy" },
  ];

  const moodColors = {
    sad: "#D50000", 
    unhappy: "#FFA500", 
    neutral: "#FFDD00",
    smiling: "#00C853",
    laughing: "#FFD700", 
  };

  return (
    <div className="bg-transparent flex-1 border border-[#C1C1C194] p-3 pt-1 rounded-xl shadow-md">
      <h2 className="text-end text-sm text-[#979797] font-bold mb-2">
        Mood of the week
      </h2>
      <div className="flex justify-around items-center rounded p-3   bg-white">
        {moodData.length > 0 ? (
          moodData.map(({ day, mood }, index) => (
            <div key={day} className="flex flex-col items-center">
              <Image
                src={moodEmojis[mood as keyof typeof moodEmojis].moodImg}
                alt={moodEmojis[mood as keyof typeof moodEmojis].mood}
                className="w-4 h-4 mb-1"
              />
              <span
                className="text-xs font-semibold"
                style={{ color: moodColors[mood as keyof typeof moodColors] }}
              >
                {day}
              </span>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MoodOfTheWeek;
