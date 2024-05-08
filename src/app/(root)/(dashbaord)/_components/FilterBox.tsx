import React from 'react';
import Level from './Level';
import Efficiency from './Efficiency';
import EmojiMood from './EmojiMoodSelector';

const FilterBox = () => {
	return (
		<div className='bg-box py-5 h-full min-h-[calc(100dvh-140px)] shadow-lg rounded-3xl w-[200px] flex flex-col items-start gap-8  text-2 xl '>
			<h2 className='text-[#4D4D4D] text-center w-full text-2xl font-bold'>Filter Students </h2>
			<div className=' flex px-4	 flex-col items-center gap-4 justify-between w-full'>
				<Level></Level>
				<Efficiency />
				<EmojiMood />
				<div className='text-black'>
					<h4 className='text-[10px] font-bold'>Note:</h4>
					<p className='text-[10px] font-medium'>Emoji depict the average mood of a week</p>
				</div>
			</div>
		</div>
	);
};

export default FilterBox;
