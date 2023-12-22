import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import moment from 'moment';
import axios from 'axios';
import { CounterContext } from '../context/bets.context';

export default function GameCard({ game, raw }) {
	const { state, dispatch } = useContext(CounterContext);
	const startTime = moment(game.start_date).format('dddd h:mmA');
	const [activeArray, setActiveArray] = useState([false, false, false]);

	useEffect(() => {
		let newActiveArray = [false, false, false];

		state.bets.forEach((bet) => {
			if (bet.gameId !== game.id) {
				return;
			}
			if (bet.betOnTeam === game.away_team_name) {
				newActiveArray[0] = true;
			} else if (bet.betOnTeam === 'Draw') {
				newActiveArray[1] = true;
			} else if (bet.betOnTeam === game.home_team_name) {
				newActiveArray[2] = true;
			}
		});

		setActiveArray(newActiveArray);
	}, [state]);

	const onOptionClick = (optionIndex) => {
		const newStateArray = [...activeArray];
		newStateArray[optionIndex] = !newStateArray[optionIndex];
		setActiveArray(newStateArray);

		let betOnTeam, betType, price, point, awayTeam, homeTeam, gameId, gameHash, index, amount;

		switch (optionIndex) {
			case 0:
			case 2:
				// away spread or over
				betType = 'moneyline';
				betOnTeam = optionIndex === 0 ? game.away_team_name : game.home_team_name;
				price = optionIndex === 0 ? game.away_moneyline : game.home_moneyline;
				break;

			case 1:
				// draw
				betType = 'moneyline';
				betOnTeam = 'Draw';
				price = game.draw_moneyline;
				break;

			default:
				// Handle the default case if needed
				break;
		}

		awayTeam = game.away_team_name;
		homeTeam = game.home_team_name;
		gameId = game.id;
		gameHash = game.hash;

		dispatch({ betOnTeam, betType, price, point, awayTeam, homeTeam, gameId, gameHash, index, amount });
	};

	return (
		<div className="w-full my-2 px-3 py-2 border-darkGray" style={{ backgroundColor: "#131313" }} >
			{(!raw && game.props) && (
				<div className="flex justify-between w-full">
					<Link href={`/games/${game.league_id}/${game.id}`} className="font-bold no-underline text-blue-500 text-xs">
						More Wagers
					</Link>
				</div>
			)}

			<div className="pb-2 ">
				<div className="gc2-card-header">
					<p className="font-bold text-gray-500">{`${game.away_team_name} @ ${game.home_team_name}`}</p>
					<p className="text-gray-600 text-xs font-bold">{startTime}</p>
				</div>
			</div>

			<div className="pb-2 grid grid-cols-12 gap-2 ">
				<div className={styles.cellOuter} onClick={() => onOptionClick(0)}>
					<p className={`${styles.name} md:hidden `} >
						{game.away_team_name.length > 10
							? `${game.away_team_name.substring(0, 8)}...`
							: game.away_team_name}
					</p>
					<p className={`${styles.name} hidden md:flex `} >
						{game.away_team_name}
					</p>
					<p className={`${styles.moneyline} ${activeArray[0] ? 'font-bold' : 'text-blue-500'}`}>{game.away_moneyline}</p>
				</div>

				<div className={styles.cellOuter} onClick={() => onOptionClick(1)}>
					<p className={`${styles.name} ${activeArray[1] ? 'text-black' : 'text-white'}`}>Draw</p>
					<p className={`${styles.moneyline} ${activeArray[1] ? '' : 'text-blue-500'}`}>{game.draw_moneyline}</p>
				</div>

				<div className={styles.cellOuter} onClick={() => onOptionClick(2)}>
					<p className={`${styles.name} md:hidden `} >
						{game.home_team_name.length > 10
							? `${game.home_team_name.substring(0, 8)}...`
							: game.home_team_name}
					</p>
					<p className={`${styles.name} hidden md:flex `} >
						{game.home_team_name}
					</p>
					<p className={`${styles.moneyline} ${activeArray[2] ? '' : 'text-blue-500'}`}>{game.home_moneyline}</p>
				</div>
			</div>
		</div>
	);
}

const styles = {
	cellOuter: "col-span-4 w-full flex  justify-center items-center flex-col bg-darkGray sm:flex-row p-2",
	moneyline: "text-sm sm:ml-2 font-bold text-lightGray",
	name: "text-sm font-bold"
}
