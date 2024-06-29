
import { moodEmojis } from "@/helpers/constants/moodEmojis";
import React, { useEffect, useState } from "react";

const SubjectStreak = () => {
const subjects = [
  { name: "Maths", streak: "4/10" },
  { name: "Physics", streak: "6/10" },
  { name: "Chemistry", streak: "8/10" },
];

  return (
    <div className="bg-transparent flex-1 border border-[#C1C1C194] p-3 pt-1 rounded-xl shadow-md">
      <h2 className="text-end text-sm text-[#979797] font-bold mb-2">
        Total Streaks 30
      </h2>
      <div className="flex justify-around items-center rounded p-1 bg-[#F1E7FF] lg:bg-white">
        {subjects.length > 0 ? (
          subjects.map(({ name, streak }, index) => (
            <div key={name} className="flex flex-col items-center">
              <span className="text-[#4D555E] font-bold text-base">{name}</span>
              <span className="text-2xl font-semibold text-[#4A02B1]">
                {streak}
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

export default SubjectStreak;
