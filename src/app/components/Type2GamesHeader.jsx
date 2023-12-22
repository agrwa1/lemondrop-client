const Type2GamesHeader = ({ leagueName, sport }) => {
	return (
		<table className='w-full my-4 border-b border-darkGray'>
			<tr className='grid grid-cols-12 items-center'>
				<td className='col-span-12 games-header-name'>
					<h3 className='text-md mb-4 font-bold text-gray-700'>
						{sport} / {leagueName}
					</h3>
				</td>
			</tr>
			<tr className='grid grid-cols-12 items-center'>
				<td className='col-span-4 header-stat'>
					<div className='flex items-center justify-center w-full h-full text-gray-600'>
						<h3 className='text-xs'>AWAY</h3>
					</div>
				</td>
				<td className='col-span-4'>
					<div className='flex justify-center w-full text-gray-600'>
						<h3 className='text-xs'>DRAW</h3>
					</div>
				</td>
				<td className='col-span-4'>
					<div className='flex justify-center w-full text-gray-600'>
						<h3 className='text-xs'>HOME</h3>
					</div>
				</td>
			</tr>
		</table>
	);
};

export default Type2GamesHeader