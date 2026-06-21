"use client";

import React, { useState } from "react";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ISubject } from "@/helpers/types";
import { getFormattedDate } from "@/helpers/utils";

import ContinuousRevision from "./ContinuousRevision";
import NewTopicLearnt from "./NewTopicLearnt";

type Topic = {
  topic: {
    name: string;
  };
};

type TweeksTopic = {
  day: string;
  date: string;
  continuousRevisionTopics: Topic[];
  backRevisionTopics: Topic[];
};

const Plannercontent = ({
  weekstopic,
  studentStandard,
  studentSubjects,
  studentCompetitiveExam,
}: {
  weekstopic: TweeksTopic[];
  studentStandard: number;
  studentSubjects: ISubject[];
  studentCompetitiveExam: string;
}) => {
  const [visibleTopics, setVisibleTopics] = useState(
    weekstopic.map((datecard) => ({
      continuous: datecard.continuousRevisionTopics.map(() => true),
      back: datecard.backRevisionTopics.map(() => true),
    }))
  );
  const [showPopup, setShowPopup] = useState(false);
  const [newTopicLearnt, setNewTopicLearnt] = useState(false);

  const handleClose = (
    dateIndex: number,
    topicIndex: number,
    type: "continuous" | "back"
  ) => {
    const newVisibleTopics = visibleTopics.map((topics, i) =>
      i === dateIndex
        ? {
            ...topics,
            [type]: topics[type].map((visible, j) =>
              j === topicIndex ? false : visible
            ),
          }
        : topics
    );
    setVisibleTopics(newVisibleTopics);
  };

  return (
    <div className="md:border md:border-[#9898988A] mb-[20px] md:mb-0 h-[calc(100dvh-80px)] custom__scrollbar overflow-y-auto rounded-[6px] shadow-md px-[3%] pt-[3%]">
      {weekstopic.map((datecard, dateIndex) => (
        <div key={datecard.date}>
          <div className="bg-[#F0E5FF] flex items-center justify-between px-[3%] text-[16px] py-[1%] font-bold border rounded-t-[6px] border-b-0 border-[#DFDBDB]">
            <p>
              {datecard.day}, {getFormattedDate(new Date(datecard.date))}
            </p>
            {/* <div className="flex gap-5">
              <ContinuousRevision
                studentStandard={studentStandard}
                studentSubjects={studentSubjects}
                studentCompetitiveExam={studentCompetitiveExam}
              />
              <Trash2 className="text-primary cursor-pointer size-5" />
            </div> */}
          </div>
          <div className="bg-[#F5EFFF] h-[70px] w-full border py-[0.9%] mb-[11px] flex justify-center rounded-b-[6px] border-[#DFDBDB]">
            <div className="flex overflow-x-auto mx-[10px] md:mx-0 mb-[11px] md:mb-0 md:my-0 no-scrollbar flex-row items-center gap-[21px] md:gap-[41px] h-full px-[1.5%]">
              {datecard.continuousRevisionTopics.map(
                (topic, topicIndex) =>
                  visibleTopics[dateIndex].continuous[topicIndex] && (
                    <div
                      key={topicIndex}
                      className="bg-[#E2D0FF] shrink-0 p-[8px] rounded-[9px] relative"
                    >
                      <p className="text-[15px] pr-[10px] font-medium">
                        {topic.topic.name}
                      </p>
                    </div>
                  )
              )}
              {datecard.backRevisionTopics.map(
                (topic, topicIndex) =>
                  visibleTopics[dateIndex].back[topicIndex] && (
                    <div
                      key={topicIndex}
                      className="bg-[#E2D0FF] shrink-0 p-[8px] rounded-[9px] relative"
                    >
                      <p className="text-[15px] pr-[10px] font-medium">
                        {topic.topic.name}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plannercontent;
