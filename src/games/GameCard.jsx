import React, { useState, useEffect } from 'react'

import { Box, Button, Typography, Grid, Table, TableBody } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import moment from 'moment'
import axios from 'axios'


export default function GameCard({ bets, game, raw, addBet, removeBet }) {
	const sportTitle = game.sport_title
	const startTime = moment(game.commence_time).calendar()
	const [homeLogoUrl, setHomeLogoUrl] = useState("")
	const [awayLogoUrl, setAwayLogoUrl] = useState("")
	// internal active buttons logic
	const [activeArray, setActiveArray] = useState([false, false, false, false, false, false])

	// getting logos
	useEffect(() => {
		if (!sportTitle) return // bugs out if missing this line
		console.log(game.id)
		const homeUrl = `https://lemondrop-api.onrender.com/api/assets/${sportTitle}/${game.home_team}`
		const awayUrl = `https://lemondrop-api.onrender.com/api/assets/${sportTitle}/${game.away_team}`
		axios.get(awayUrl).then(res => setAwayLogoUrl(res.data))
		axios.get(homeUrl).then(res => setHomeLogoUrl(res.data))
	}, [game])

	useEffect(() => {
		// set all to false and then iterate over if game id and away or bet type matches
		let newActiveArray = [false, false, false, false, false, false]

		bets.forEach(bet => {
			// if different game
			if (bet.GameId == game.id) {
				// console.log(bet.GameId, " matches ", game.id)

				if (bet.BetType.toLowerCase() == "spread") {
					if (bet.BetOnTeam == `${game.away_team} ${game.away_spread_point > 0 ? `+${game.away_spread_point}` : game.away_spread_point}`) {
						// away spread
						newActiveArray[0] = true
					} else {
						newActiveArray[3] = true
					}
				} else if (bet.BetType.toLowerCase() == "moneyline") {
					if (bet.BetOnTeam == game.away_team) {
						newActiveArray[1] = true
					} else {
						newActiveArray[4] = true
					}
				} else if (bet.BetType.toLowerCase() == 'over') {
					newActiveArray[2] = true
				} else if (bet.BetType.toLowerCase() == 'under') {
					newActiveArray[5] = true
				}
			}
		})

		setActiveArray(newActiveArray)
	}, [bets])

	const addBetByIndex = optionIndex => {
		if (optionIndex == 0) {
			// away spread
			addBet(`${game.away_team} ${game.away_spread_point > 0 ? `+${game.away_spread_point}` : game.away_spread_point}`, "spread", game.away_spread_price, game.away_team, game.home_team, game.id)
		} else if (optionIndex == 1) {
			// away money
			addBet(game.away_team, "moneyline", game.away_moneyline_price, game.away_team, game.home_team, game.id)
		} else if (optionIndex == 2) {
			// over
			addBet(`Over ${game.over_point}`, "over", game.over_price, game.away_team, game.home_team, game.id)
		} else if (optionIndex == 3) {
			// home spread
			addBet(`${game.home_team} ${game.home_spread_point > 0 ? `+${game.home_spread_point}` : game.home_spread_point}`, "spread", game.home_spread_price, game.away_team, game.home_team, game.id)
		} else if (optionIndex == 4) {
			// home money
			addBet(game.home_team, "moneyline", game.home_moneyline_price, game.away_team, game.home_team, game.id)
		} else if (optionIndex == 5) {
			// under
			addBet(`Under ${game.under_point}`, "Under", game.under_price, game.away_team, game.home_team, game.id)
		}
	}

	const deleteBetByOptionIndex = optionIndex => {
		bets.forEach(bet => {
			// match with index and if bet matches => remove via delete func

			// if game id doesnt match then return
			if (bet.GameId != game.id) {
				return
			}

			if (optionIndex == 0 && bet.BetOnTeam == `${game.away_team} ${game.away_spread_point > 0 ? `+${game.away_spread_point}` : game.away_spread_point}`) {
				removeBet(bet.Index)
			} else if (optionIndex == 1 && bet.BetOnTeam == game.away_team) {
				removeBet(bet.Index)
			} else if (optionIndex == 2 && bet.BetType.toLowerCase() == "over") {
				removeBet(bet.Index)
			} else if (optionIndex == 3 && bet.BetOnTeam == `${game.home_team} ${game.home_spread_point > 0 ? `+${game.home_spread_point}` : game.home_spread_point}`) {
				removeBet(bet.Index)
			} else if (optionIndex == 4 && bet.BetOnTeam == game.home_team) {
				removeBet(bet.Index)
			} else if (optionIndex == 5 && bet.BetType.toLowerCase() == "under") {
				removeBet(bet.Index)
			}

		})
	}

	const onOptionClick = (optionIndex) => {
		const newStateArray = activeArray
		activeArray[optionIndex] = !activeArray[optionIndex]
		setActiveArray([...newStateArray])

		// if just clicked => add to bets
		if (activeArray[optionIndex]) {
			addBetByIndex(optionIndex)
		}

		// else remove bet from bets
		else {
			deleteBetByOptionIndex(optionIndex)
		}



	}


	const tableData = [
		{
			name: game.away_team,
			spread_point: game.spreads_exist ? game.away_spread_point > 0 ? `+${game.away_spread_point}` : game.away_spread_point : "-",
			spread_price: game.spreads_exist ? game.away_spread_price > 0 ? `+${game.away_spread_price}` : game.away_spread_price : "",
			moneyline: game.moneylines_exist ? `${game.away_moneyline_price > 0 ? `+${game.away_moneyline_price}` : game.away_moneyline_price}` : '-',
			totals_point: game.totals_exist ? `O${game.over_point}` : "-",
			totals_price: game.totals_exist ? game.over_price > 0 ? `+${game.over_price}` : game.over_price : "",
			logoSource: awayLogoUrl ? awayLogoUrl : "",
		},
		{
			name: game.home_team,
			spread_point: game.spreads_exist ? game.home_spread_point > 0 ? `+${game.home_spread_point}` : game.home_spread_point : "-",
			spread_price: game.spreads_exist ? game.home_spread_price > 0 ? `+${game.home_spread_price}` : game.home_spread_price : "",
			moneyline: game.moneylines_exist ? `${game.home_moneyline_price > 0 ? `+${game.home_moneyline_price}` : game.home_moneyline_price}` : '-',
			totals_point: game.totals_exist ? `U${game.under_point}` : "-",
			totals_price: game.totals_exist ? game.under_price > 0 ? `+${game.under_price}` : game.under_price : "",
			logoSource: homeLogoUrl ? homeLogoUrl : "",
		},
	]


	return (
		<Grid item xs={12} key={game.id} className={"bet-table"} >
			<Table>
				{
					!raw &&
					<caption  >
						<Box sx={{ display: 'flex', justifyContent: "space-between", width: '100%' }} >
							{startTime}
							<Link to={`/game/${game.id}`} style={{ fontWeight: 'bold', textDecoration: 'none', color: "#2c90ff", fontSize: '12px' }}  >More Wagers</Link>
						</Box>
					</caption>
				}

				<TableBody>
					{
						tableData.map((row, tableIndex) =>
							<Grid key={tableIndex} container sx={{ padding: '0.3em' }} >
								<Grid item xs={6}>
									<Box className="bet-team-name">
										<img src={row.logoSource} className="team-logo" alt="logo"></img>
										<Typography color="primary" variant="body2" sx={{ fontWeight: 'bold', padding: '0 1em' }} >{row.name}</Typography>
									</Box>
								</Grid>

								<Grid item xs={2}>
									<Box onClick={() => onOptionClick(3 * tableIndex)} className={`${game.spreads_exist ? 'bet-option' : "bet-option-locked"} ${activeArray[3 * tableIndex] ? "bet-option-active" : ""}`}>
										<Typography variant="body2" style={activeArray[3 * tableIndex] ? { fontSize: "12px", fontWeight: 'bold' } : { fontSize: "12px" }} >{row.spread_point}</Typography>
										<Typography variant="body2" style={activeArray[3 * tableIndex] ? { fontSize: '12px', fontWeight: 'bold' } : { fontSize: '12px', color: '#444' }} >{row.spread_price}</Typography>
									</Box>
								</Grid>
								<Grid item xs={2}>
									<Box onClick={() => onOptionClick(3 * tableIndex + 1)} className={`${game.moneylines_exist ? 'bet-option' : "bet-option-locked"} ${activeArray[3 * tableIndex + 1] ? "bet-option-active" : ""}`}>
										<Typography variant="body2" style={activeArray[3 * tableIndex + 1] ? { fontSize: "12px", fontWeight: 'bold' } : { fontSize: "12px" }} >{row.moneyline}</Typography>
									</Box>
								</Grid>
								<Grid item xs={2}>
									<Box onClick={() => onOptionClick(3 * tableIndex + 2)} className={`${game.totals_exist ? 'bet-option' : "bet-option-locked"} ${activeArray[3 * tableIndex + 2] ? "bet-option-active" : ""}`}>
										<Typography variant="body2" style={activeArray[3 * tableIndex + 2] ? { fontSize: "12px", fontWeight: 'bold' } : { fontSize: "12px" }} >{row.totals_point}</Typography>
										<Typography variant="body2" style={activeArray[3 * tableIndex + 2] ? { fontSize: '12px', fontWeight: 'bold' } : { fontSize: '12px', color: '#444' }} >{row.totals_price}</Typography>
									</Box >
								</Grid>

							</Grid>
						)
					}

				</TableBody>
			</Table>

			{
				!raw &&
				<Box sx={{ width: '100%', height: 0, borderBottom: '1px solid #333' }} />
			}

		</Grid >
	)

}

