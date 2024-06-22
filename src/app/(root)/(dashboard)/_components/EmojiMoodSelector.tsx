import { MoodEmoji } from "@/helpers/types";
import { moodEmojis } from "@/helpers/constants/moodEmojis";

import Image from "next/image";

const EmojiMoodSelector = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h4 className="text-[#7A7A7A] text-[18px] font-medium">Mood</h4>
      <div className="flex w-full ml-[22px] md:ml-0 items-center md:justify-center">
        <ul className="grid grid-cols-2 gap-2">
          {Object.keys(moodEmojis).map((mood) => {
            const option = moodEmojis[  mood as keyof typeof moodEmojis];
            return (
              <li key={option.mood_id}>
                <div className="flex gap-2 justify-center items-center">
                  <input type="checkbox" id={option.mood_id} />
                  <label
                    htmlFor={option.mood_id}
                    className="flex justify-start items-center w-8 h-4  cursor-pointer"
                  >
                    <Image
                      src={option.moodImg}
                      alt="checkbox-label"
                      width={20}
                      height={20}
                      className=" h-4 w-4"
                    />
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default EmojiMoodSelector;
