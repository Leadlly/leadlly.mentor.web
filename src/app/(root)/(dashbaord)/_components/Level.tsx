import React from 'react';
import CheckBox from './CheckBox';
const level = [1, 2, 3, 4, 5];
const Level = () => {
	return (
		<div className='w-full flex flex-col gap-3'>
			<h4 className='text-[#7A7A7A] font-medium '>Level</h4>
			<div className='flex w-full items-center justify-center'>
				<ul className='grid grid-cols-2 gap-2 '>
					{level.map((lvl) => {
						return (
							<li key={`lvl-${lvl}`}>
								<div className='flex gap-2 justify-center items-center'>
									<CheckBox value={`${lvl}`}></CheckBox>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Level;
