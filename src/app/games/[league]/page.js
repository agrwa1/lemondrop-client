'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import GameCard from '../../components/GameCard';
import Betslip from '../../components/Betslip';
import Type1GamesHeader from '../../components/Type1GamesHeader';
import Type2GamesHeader from '../../components/Type2GamesHeader';
import Loading from './loading';

export default function Page() {
	const params = useParams();
	const league = params['league'];
	const [leagueParsed, setLeagueParsed] = useState('');
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// wont rerender because of empty dependency array
		setLoading(true);
		const url = `https://lemondrop-api.onrender.com/api/games/league/${league}`;
		axios.get(url).then((res) => {
			setGames(res.data);
			setLoading(false);
			setLeagueParsed(res.data[0].league);
		});
	}, [league]);

	return (
		<div key={league}>
			{/* {
				loading &&
				<div style={{ display: 'flex', justifyContent: 'center' }} >
				<CircularProgress />
				</div>
			} */}

			<div className='grid grid-cols-12 gap-4'>
				{/* <div className='col-span-1 md:col-span-8'>
					<div className='h-4'></div>
				</div> */}

				<div className='col-span-12 lg:col-span-8 '>
					<div className='grid grid-cols-1 '>
						{games.length === 0 && !loading && (
							<div className='col-span-1 text-center'>
								<h3 className='text-3xl'>
									Sorry, No Active Games Right Now!
								</h3>
							</div>
						)}

						{games.length > 0 && !games[0].draw_moneyline && (
							<Type1GamesHeader
								leagueName={leagueParsed}
								sport={games[0].sport}
							/>
						)}

						{games.length > 0 && games[0].draw_moneyline && (
							<Type2GamesHeader
								leagueName={leagueParsed}
								sport={games[0].sport}
							/>
						)}

						<div className='grid grid-cols-1'>
							{games.map((game) => (
								<GameCard game={game} key={game.id} />
							))}
						</div>
					</div>
				</div>

				<div className='col-span-12 lg:col-span-4'>
					<Betslip />
				</div>

				{/* <Snackbar
    open={success}
    message='Bets Successfully Placed!'
    onClose={() => setSuccess(false)}
    autoHideDuration={6000}
  />
  <Snackbar
    open={failure}
    message='Failed to Place Bets'
    onClose={() => setFailure(false)}
    autoHideDuration={6000}
  /> */}
			</div>
		</div>
	);
}
