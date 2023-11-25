import React, { useState, useEffect } from 'react'

import { Box, Button, Typography, Grid, Table, TableBody } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import moment from 'moment'
import axios from 'axios'

export default function GameCard({ bets, game, raw, addBet, removeBet }) {
	// console.log(game)
	const sportTitle = game.league
	const startTime = moment(game.start_date).format("dddd h:mmA")
	const [homeLogoUrl, setHomeLogoUrl] = useState("")
	const [awayLogoUrl, setAwayLogoUrl] = useState("")
	// internal active buttons logic
	const [activeArray, setActiveArray] = useState([false, false, false, false, false, false])

	// getting logos
	// useEffect(() => {
	// 	if (!sportTitle) return // bugs out if missing this line
	// 	// console.log(game.id)
	// 	const homeUrl = `https://lemondrop-api.onrender.com/api/assets/${sportTitle}/${game.home_team}`
	// 	const awayUrl = `https://lemondrop-api.onrender.com/api/assets/${sportTitle}/${game.away_team}`
	// 	axios.get(awayUrl).then(res => setAwayLogoUrl(res.data))
	// 	axios.get(homeUrl).then(res => setHomeLogoUrl(res.data))
	// }, [game])

	useEffect(() => {
		// set all to false and then iterate over if game id and away or bet type matches
		let newActiveArray = [false, false, false, false, false, false]

		bets.forEach(bet => {
			// if different game
			if (bet.GameId == game.id) {

				if (bet.BetType.toLowerCase() == "spread") {
					if (bet.BetOnTeam == `${game.away_team_name} ${game.away_spread_point}`) {
						// away spread
						newActiveArray[0] = true
					} else {
						newActiveArray[3] = true
					}
				} else if (bet.BetType.toLowerCase() == "moneyline") {
					if (bet.BetOnTeam == game.away_team_name) {
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
		console.log(game)
		if (optionIndex == 0) {
			// away spread
			addBet(`${game.away_team_name} ${game.away_spread_point}`, "spread", game.away_spread_price, game.away_spread_point, game.away_team_name, game.home_team_name, game.id, game.hash)
		} else if (optionIndex == 1) {
			// away money
			addBet(game.away_team_name, "moneyline", game.away_moneyline, "", game.away_team_name, game.home_team_name, game.id, game.hash)
		} else if (optionIndex == 2) {
			// over
			addBet(`Over ${game.over_point}`, "over", game.over_price, game.over_point, game.away_team_name, game.home_team_name, game.id, game.hash)
		} else if (optionIndex == 3) {
			// home spread
			addBet(`${game.home_team_name} ${game.home_spread_point}`, "spread", game.home_spread_price, game.home_spread_point, game.away_team_name, game.home_team_name, game.id, game.hash)
		} else if (optionIndex == 4) {
			// home money
			addBet(game.home_team_name, "moneyline", game.home_moneyline, "", game.away_team_name, game.home_team_name, game.id, game.hash)
		} else if (optionIndex == 5) {
			// under
			addBet(`Under ${game.under_point}`, "Under", game.under_price, game.under_point, game.away_team_name, game.home_team_name, game.id, game.hash)
		}
	}

	const deleteBetByOptionIndex = optionIndex => {
		bets.forEach(bet => {
			if (bet.GameId != game.id) {
				return
			}
			if (optionIndex == 0 && bet.BetOnTeam == `${game.away_team_name} ${game.away_spread_point}`) {
				removeBet(bet.Index)
			} else if (optionIndex == 1 && bet.BetOnTeam == game.away_team_name) {
				removeBet(bet.Index)
			} else if (optionIndex == 2 && bet.BetType.toLowerCase() == "over") {
				removeBet(bet.Index)
			} else if (optionIndex == 3 && bet.BetOnTeam == `${game.home_team_name} ${game.home_spread_point}`) {
				removeBet(bet.Index)
			} else if (optionIndex == 4 && bet.BetOnTeam == game.home_team_name) {
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
			name: game.away_team_name,
			spread_point: game.away_spread_point,
			spread_price: game.away_spread_price,
			moneyline: game.away_moneyline,
			totals_point: `O${game.over_point}`,
			totals_price: game.over_price,
		},
		{
			name: game.home_team_name,
			spread_point: game.home_spread_point,
			spread_price: game.home_spread_price,
			moneyline: game.home_moneyline,
			totals_point: `U${game.under_point}`,
			totals_price: game.under_price,
		},
	]


	return (
		<Box className="bet-table">
			<Grid item xs={12} key={game.id}>
				<Grid item xs={12}>
					<Box sx={{ display: 'flex', justifyContent: "start", width: '100%', padding: '1em 0 0 1em' }} >
						<Typography variant="body1" sx={{ color: "#bbb", fontSize: '13px', fontWeight: 'bold' }} >{startTime}</Typography>
					</Box>
				</Grid>
				<Table>
					<TableBody>
						{
							tableData.map((row, tableIndex) =>
								<Grid key={Math.floor(Math.random() * 100000000000)} container sx={{ padding: '0.1em' }} >

									<Grid item xs={6}>
										<Box className="bet-team-name">
											<Typography color="primary" variant="body2" sx={{ fontWeight: 'bold', padding: '0 1em' }} >{row.name}</Typography>
										</Box>
									</Grid>

									{
										row.spread_point &&
										<Grid item xs={2}>
											<Box onClick={() => onOptionClick(3 * tableIndex)} className={`${'bet-option'} ${activeArray[3 * tableIndex] ? "bet-option-active" : ""}`}>
												<Typography variant="body2" style={{ fontSize: '12px', fontWeight: 'bold' }} >{row.spread_point}  </Typography>
												<Typography variant="body2" style={activeArray[3 * tableIndex] ? { fontSize: '12px', fontWeight: 'bold' } : { fontSize: '12px', color: '#5b40f6', fontWeight: 'bold' }}>{row.spread_price}</Typography>
											</Box>
										</Grid>
									}
									{
										!row.spread_point &&
										<Grid item xs={2}>
											<Box className={`bet-option-disabled bet-option`}>
												<Typography variant="body2" style={{ color: "white", fontWeight: 'bold', fontSize: '12px' }}></Typography>
											</Box>
										</Grid>
									}

									{
										row.moneyline &&
										<Grid item xs={2}>
											<Box onClick={() => onOptionClick(3 * tableIndex + 1)} className={`${'bet-option'} ${activeArray[3 * tableIndex + 1] ? "bet-option-active" : ""}`}>
												<Typography variant="body2" style={activeArray[3 * tableIndex + 1] ? { fontWeight: 'bold', fontSize: '12px' } : { fontSize: '12px', color: '#5b40f6', fontWeight: 'bold' }}>{row.moneyline} </Typography>
											</Box>
										</Grid>
									}
									{
										!row.moneyline &&
										<Grid item xs={2}>
											<Box className={`bet-option-disabled bet-option`}>
												<Typography variant="body2" style={{ color: "white", fontWeight: 'bold', fontSize: '12px' }}></Typography>
											</Box>
										</Grid>
									}


									{
										row.totals_price &&
										<Grid item xs={2}>
											<Box onClick={() => onOptionClick(3 * tableIndex + 2)} className={`${'bet-option'} ${activeArray[3 * tableIndex + 2] ? "bet-option-active" : ""}`}>
												<Typography variant="body2" style={{ fontSize: '12px', fontWeight: 'bold' }} >{row.totals_point}  </Typography>
												<Typography variant="body2" style={activeArray[3 * tableIndex + 2] ? { fontSize: '12px', fontWeight: 'bold' } : { fontSize: '12px', color: '#5b40f6', fontWeight: 'bold' }}>{row.totals_price}</Typography>
											</Box >
										</Grid>
									}
									{
										!row.totals_price &&
										<Grid item xs={2}>
											<Box className={`bet-option-disabled bet-option`}>
												<Typography variant="body2" style={{ color: "white", fontWeight: 'bold', fontSize: '12px' }}></Typography>
											</Box >
										</Grid>
									}

								</Grid>
							)
						}

					</TableBody>
				</Table>


			</Grid >
		</Box>
	)

}

