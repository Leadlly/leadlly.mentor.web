import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import NewTopicLearnt from './NewTopicLearnt';

type TweeksTopic = {
  day: string;
  date: string;
  topics: string[];
};

const Plannercontent = ({ weekstopic }: { weekstopic: TweeksTopic[] }) => {
  const [visibleTopics, setVisibleTopics] = useState(
    weekstopic.map(datecard => datecard.topics.map(() => true))
  );
  const [showPopup, setShowPopup] = useState(false);
  const [newTopicLearnt, setNewTopicLearnt] = useState(false);

  const handleClose = (dateIndex: number, topicIndex: number) => {
    const newVisibleTopics = visibleTopics.map((topics, i) =>
      i === dateIndex
        ? topics.map((visible, j) => (j === topicIndex ? false : visible))
        : topics
    );
    setVisibleTopics(newVisibleTopics);
  };

  return (
    <div className='md:border md:border-[#9898988A] mb-[20px] md:mb-[0px] h-[calc(100dvh-120px)] custom__scrollbar overflow-y-auto rounded-[6px] shadow-md px-[3%] pt-[3%]'>
      <div className='mb-[41px]'>
        <button className='text-[16px] flex justify-center gap-[10px] items-center font-medium text-white bg-[#CDAAFF] rounded-[4px] py-[3px] px-[10px]'>
          <p>Add Revision sessions</p>
          <div className='border border-[#6200EE] rounded-[9999px]'>
          <Plus className='text-[#6200EE] w-[12px] h-[12px] font-bold'/>
          </div>
          
          </button>
        
      </div>
      {weekstopic.map((datecard, dateIndex) => (
        <div key={datecard.date} className="mb-[1%]">
          <div className='bg-[#F0E5FF] flex justify-between px-[3%] text-[16px] py-[1%] font-bold border rounded-t-[6px] border-b-0 border-[#DFDBDB]'>
            <p>{datecard.day}, {datecard.date}</p>
            <div className='flex gap-[20px]'>
              <Plus 
                onClick={() => setShowPopup(true)} 
                className='text-[#6200EE] bg-white rounded-[9999%] p-[1.5%] cursor-pointer' 
              />
              <Trash2 className='text-[#6200EE] bg-white rounded-[9999%] p-[1.5%]' />
            </div>
          </div>
          <div className='bg-[#F5EFFF] w-full border py-[0.9%] mb-[11px] flex justify-center rounded-b-[6px] border-[#DFDBDB]'>
            <div className='flex overflow-x-auto mx-[10px] md:mx-[0px] my-[11px] md:my-[0px] no-scrollbar justify-between md:gap-[41px] gap-[21px]'>
              {datecard.topics.map((topic, topicIndex) => (
                visibleTopics[dateIndex][topicIndex] && (
                  <div key={topicIndex} className='bg-[#E2D0FF] flex p-[8px] rounded-[9px] relative'>
                    <p className='text-[15px] pr-[10px] font-medium'>{topic}</p>
                    <X
                      onClick={() => handleClose(dateIndex, topicIndex)}
                      className='absolute cursor-pointer top-0 right-[3px] w-[10px]'
                    />
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      ))}
      {showPopup && (
        <div className="fixed inset-0 rounded-[3px] bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white relative rounded-[10px] p-4 w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%]">
            <button 
              type="button"
              className="absolute top-4 right-4 text-black" 
              onClick={() => setShowPopup(false)}
              aria-label="Close popup"
            >
              <X size={24} className='text-[#6a6a6a]' />
            </button>
            <NewTopicLearnt setNewTopicLearnt={setNewTopicLearnt}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plannercontent;
