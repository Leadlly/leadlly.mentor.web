import React from 'react';
const level = [1, 2, 3, 4, 5];
const Level = () => {
	return (
		<div className='w-full'>
			<h4 className='text-[#7A7A7A] font-normal '>Level</h4>
			<div className='flex w-full items-center justify-center'>
				<ul className='grid grid-cols-2 gap-2 '>
					{level.map((lvl) => {
						return (
							<li key={`lvl-${lvl}`}>
								<div className='flex gap-2 justify-center items-center'>
									<input
										type='checkbox'
										name={`lvl-${lvl}`}
									/>
									<label
										htmlFor={`lvl-${lvl}`}
										className='px-2 text-blue-700 text-[8px] border-[0.6px] border-[#464646] rounded-[4px]'
									>
										{lvl}
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

export default Level;
