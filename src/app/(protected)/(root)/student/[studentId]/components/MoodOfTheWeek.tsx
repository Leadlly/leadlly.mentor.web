import { moodEmojis } from "@/helpers/constants/moodEmojis";
import Image from "next/image";
import React from "react";


type MoodData = {
  mood: Array<{ day: string; date?: string| null; emoji?: string|null}>;
};
const MoodOfTheWeek = ({mood}:MoodData) => {
  

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
      <div className="flex justify-around items-center rounded p-3 bg-[#F1E7FF] lg:bg-white">
        {mood.length > 0 ? (
          mood.map(({ day, emoji }, index) => (
            <div key={day} className="flex flex-col items-center">
              <Image
                src={
                  moodEmojis[(emoji ?? "neutral") as keyof typeof moodEmojis]
                    .moodImg
                }
                alt={
                  moodEmojis[(emoji ?? "neutral") as keyof typeof moodEmojis]
                    .mood
                }
                className="w-4 h-4 mb-1"
                width={24}
                height={24}
              />
              <span
                className="text-xs font-semibold"
                style={{
                  color:
                    moodColors[(emoji ?? "neutral") as keyof typeof moodColors],
                }}
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
