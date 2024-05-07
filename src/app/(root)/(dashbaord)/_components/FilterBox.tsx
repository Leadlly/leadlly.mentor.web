import React from 'react';
import Level from './Level';

const FilterBox = () => {
	return (
		<div className='bg-box py-5 min-h-[calc(100dvh-150px)] shadow-lg rounded-3xl w-[200px] flex flex-col items-start pl-5 text-2 xl font-bold'>
			<h2 className='text-[#4D4D4D] text-2xl'>Filter Students</h2>
			<div className=' flex flex-col items-center justify-between w-full'>
				<Level></Level>
			</div>
		</div>
	);
};

export default FilterBox;
