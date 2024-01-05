'use client'

import React, { useContext, useState, useEffect } from 'react'

// import { Box, Button, Typography, Grid, Table, TableBody } from '@mui/material'
import Link from 'next/link'
import LockIcon from '@mui/icons-material/Lock';
import moment from 'moment'
import { useRouter } from 'next/navigation'
// import axios from 'axios'

import { CounterContext } from "../context/bets.context";


export default function GameCard({ game, raw }) {
	const router = useRouter()
	const startTime = moment(game.start_date).format("dddd h:mmA")
	// internal active buttons logic
	const [activeArray, setActiveArray] = useState([false, false, false, false, false, false])
	const { state, dispatch } = useContext(CounterContext)
	const href = `/games/${game.league_id}/${game.id}`

	useEffect(() => {
		// set all to false and then iterate over if game id and away or bet type matches
		let newActiveArray = [false, false, false, false, false, false]

		state.bets.forEach(bet => {
			// if different game
			if (bet.gameId != game.id) {
				return
			}
			if (bet.betType.toLowerCase() == "spread") {
				if (bet.betOnTeam == `${game.away_team_name} ${game.away_spread_point}`) {
					// away spread
					newActiveArray[0] = true
				} else {
					newActiveArray[3] = true
				}

			} else if (bet.betType.toLowerCase() == "moneyline") {
				if (bet.betOnTeam == game.away_team_name) {
					newActiveArray[1] = true
				} else {
					newActiveArray[4] = true
				}

			} else if (bet.betType.toLowerCase() == 'totals') {
				if (bet.betOnTeam.includes("Over")) {
					newActiveArray[2] = true
				} else {

					newActiveArray[5] = true
				}
			}
		})

		setActiveArray(newActiveArray)
	}, [state, router])

	const onOptionClick = (optionIndex) => {
		const newStateArray = activeArray
		activeArray[optionIndex] = !activeArray[optionIndex]
		setActiveArray([...newStateArray])

		let betOnTeam, betType, price, point, awayTeam, homeTeam, gameId, gameHash, index, amount;

		switch (optionIndex) {
			case 0:
			case 3:
				// away spread or home spread
				betType = "spread";
				point = optionIndex === 0 ? game.away_spread_point : game.home_spread_point;
				betOnTeam = optionIndex === 0 ? `${game.away_team_name} ${point}` : `${game.home_team_name} ${point}`;
				price = optionIndex === 0 ? game.away_spread_price : game.home_spread_price;
				break;

			case 1:
			case 4:
				// away money or home money
				betType = "moneyline";
				betOnTeam = optionIndex === 1 ? game.away_team_name : game.home_team_name;
				price = optionIndex === 1 ? game.away_moneyline : game.home_moneyline;
				break;

			case 2:
			case 5:
				// over or under
				betType = "totals"
				point = optionIndex === 2 ? game.over_point.slice(2) : game.under_point.slice(2);
				betOnTeam = optionIndex === 2 ? `Over ${point}` : `Under ${point}`;
				price = optionIndex === 2 ? game.over_price : game.under_price;
				break;

			default:
				// Handle the default case if needed
				break;
		}

		// Common variables outside the switch
		awayTeam = game.away_team_name;
		homeTeam = game.home_team_name;
		gameId = game.id;
		gameHash = game.hash;

		dispatch({ betOnTeam, betType, price, point, awayTeam, homeTeam, gameId, gameHash, index, amount })
	}

	const tableData = [
		{
			name: game.away_team_name,
			spread_point: game.away_spread_point,
			spread_price: game.away_spread_price,
			moneyline: game.away_moneyline,
			totals_point: game.over_point,
			totals_price: game.over_price,
			photo_url: game.away_logo_url,
			record: game.away_record,
		},
		{
			name: game.home_team_name,
			spread_point: game.home_spread_point,
			spread_price: game.home_spread_price,
			moneyline: game.home_moneyline,
			totals_point: game.under_point,
			totals_price: game.under_price,
			photo_url: game.home_logo_url,
			record: game.home_record,
		},
	]

	return (
		<div style={{ backgroundColor: "#131313" }} className="my-3 px-3 py-2" >
			<div className="grid grid-cols-1" key={game.id}>
				<div >
					{!raw && (
						<div className="flex items-center justify-between w-full mb-2 px-1 ">
							<p className="text-sm  text-gray-500">{startTime}</p>
							<a href={href} className="link-reset" passHref prefetch={false} >
								<p className="text-sm text-gray-500 underline">More Wagers</p>
							</a>
						</div>
					)}
				</div>

				<div >
					<table className="min-w-full">
						<tbody>
							{tableData.map((row, tableIndex) => (
								<tr key={Math.floor(Math.random() * 100000000000)} className="grid sm:gap-2 grid-cols-12 items-center p-1">

									<td className="col-span-6">
										<div className="flex items-center">
											<div className="flex flex-col justify-center">
												<p className="text-sm font-bold text-white">{row.name}</p>
											</div>
										</div>
									</td>

									{[row.spread_point, row.moneyline, row.totals_price].map((item, index) => (
										<td key={index} className="col-span-2 h-full ">
											{item ? (
												<div
													onClick={() => onOptionClick(3 * tableIndex + index)}
													className={` flex bg-darkGray justify-center items-center flex-col sm:flex-row py-2 ${activeArray[3 * tableIndex + index] ? "bet-option-active" : ""} h-full `}
												>
													<p className="text-xs font-bold sm:mr-2">{index === 0 ? row.spread_point : index === 1 ? row.moneyline : row.totals_point}</p>
													<p className={activeArray[3 * tableIndex + index] ? "font-bold text-xs" : "text-lightGray text-xs"}>{index === 0 ? row.spread_price : index === 1 ? row.moneyline_price : row.totals_price}</p>
												</div>
											) : (
												<div className="bet-option-disabled bet-option h-full">
													<LockIcon style={{ color: "#777" }} />
												</div>
											)}
										</td>
									))}
								</tr>
							))}

						</tbody>
					</table>
				</div>
			</div>
		</div>

	)

}

