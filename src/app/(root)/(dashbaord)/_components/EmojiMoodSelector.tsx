import Image from "next/image";


const moodEmojis = [
	{
		mood: '/assets/icons/sad_emoji.png',
		mood_id: 'sad-emoji',
	},
	{
		mood: '/assets/icons/unhappy_emoji.png',
		mood_id: 'unhappy-emoji',
	},
	{
		mood: '/assets/icons/neutral_emoji.png',
		mood_id: 'neutral-emoji',
	},
	{
		mood: '/assets/icons/smiling_emoji.png',
		mood_id: 'smiling-emoji',
	},
	{
		mood: '/assets/icons/laughing_emoji.png',
		mood_id: 'laughing-emoji',
	},
];

const EmojiMoodSelector = () => {

	

	return (
		<div className='w-full flex flex-col gap-3'>
			<h4 className='text-[#7A7A7A] font-medium'>Mood</h4>
			<div className='flex w-full items-center justify-center'>
				<ul className='grid grid-cols-2 gap-2'>
					{moodEmojis.map((option) => (
						<li key={option.mood_id}>
							<div className='flex gap-2 justify-center items-center'>
								<input type='checkbox' />
								<label className='flex justify-start items-center w-8 h-4  cursor-pointer'>
									<Image
										src={option.mood}
										alt='checkbox-label'
										width={20}
										height={20}
										className=' h-4 w-4'
									/>
								</label>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default EmojiMoodSelector;
