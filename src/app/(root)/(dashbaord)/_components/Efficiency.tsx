import React from 'react';
import CheckBox from './CheckBox';

const efficiencyOptions = [
	{
		label: '70% +',
		value: '70plus',
		labelClassName: ' bg-[#E0FAEE]  border-[#008F4A]',
	},
	{
		label: '0-30%',
		value: '0to30',
		labelClassName: ' bg-[#FFC2C2]  border-[#FE8C8C]',
	},
	{
		label: '50-70%',
		value: '50to70',
		labelClassName: ' bg-[#FCF4AC]  border-[#FFF280]',
	},
	{
		label: '>> 30%',
		value: 'greaterThan30',
		labelClassName: ' bg-[#FF8A83]  border-[#FC0F00]',
	},
	{
		label: '30-50%',
		value: '30to50',
		labelClassName: ' bg-[#FED18C]  border-[#FFDAA2]',
	},
];

const Efficiency = () => {
	return (
		<div className='w-full  flex flex-col gap-3'>
			<h4 className='text-[#7A7A7A] font-medium '>Efficiency</h4>
			<div className='flex w-full items-center justify-center'>
				<ul className='grid grid-cols-2 gap-2'>
					{efficiencyOptions.map((option) => (
						<li key={option.value}>
							<div className='flex gap-2 justify-center items-center'>
								<CheckBox
									value={option.label}
									labelClassName={`text-[#095E6A] border-[0.7px] ${option.labelClassName}`}
								/>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Efficiency;
