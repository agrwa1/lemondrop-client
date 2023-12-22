const Type1GamesHeader = ({ leagueName, sport }) => {
	return (
		<table className='w-full my-4 border-b border-darkGray  '>
			<tr className='grid grid-cols-12 items-center'>
				<td className='col-span-6 games-header-name'>
					<h3 className='text-md font-bold text-gray-700'>
						{sport} / {leagueName}
					</h3>
				</td>

				<td className='col-span-2 '>
					<div className='flex items-center justify-center w-full h-full text-gray-600'>
						<h3 className='text-xs'>SPREAD</h3>
					</div>
				</td>

				<td className='col-span-2'>
					<div className='flex justify-center w-full text-gray-600'>
						<h3 className='text-xs'>MONEY</h3>
					</div>
				</td>

				<td className='col-span-2'>
					<div className='flex justify-center w-full text-gray-600'>
						<h3 className='text-xs'>TOTAL</h3>
					</div>
				</td>
			</tr>
		</table>
	);
};

export default Type1GamesHeader;