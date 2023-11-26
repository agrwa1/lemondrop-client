import React, { useState, useEffect } from 'react'

import { Box, Button, Typography, Grid, Table, TableBody } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import moment from 'moment'
import axios from 'axios'

export default function GameCard({ bets, game, raw, addBet, removeBet }) {
	const sportTitle = game.league
	const startTime = moment(game.start_date).format("dddd h:mmA")
	// internal active buttons logic
	const [activeArray, setActiveArray] = useState([false, false, false])


	useEffect(() => {
		// set all to false and then iterate over if game id and away or bet type matches
		let newActiveArray = [false, false, false]

		bets.forEach(bet => {
			// if different game
			if (bet.GameId == game.id) {
				if (bet.BetOnTeam == game.away_team_name) {
					newActiveArray[0] = true
				} else if (bet.BetOnTeam == "Draw") {
					newActiveArray[1] = true
				} else if (bet.BetOnTeam == game.home_team_name) {
					newActiveArray[2] = true
				}
			}
		})

		setActiveArray(newActiveArray)
	}, [bets])

	const addBetByIndex = optionIndex => {
		if (optionIndex == 0) {
			// away spread
			addBet(game.away_team_name, "moneyline", game.away_moneyline, 0, game.away_team_name, game.home_team_name, game.id, game.hash)
		} else if (optionIndex == 1) {
			// away money
			addBet("Draw", "moneyline", game.draw_moneyline, 0, game.away_team_name, game.home_team_name, game.id, game.hash)
		} else if (optionIndex == 2) {
			// over
			addBet(game.home_team_name, "moneyline", game.home_moneyline, 0, game.away_team_name, game.home_team_name, game.id, game.hash)
		}
	}

	const deleteBetByOptionIndex = optionIndex => {
		bets.forEach(bet => {
			if (bet.GameId != game.id) {
				return
			}
			if (optionIndex == 0 && bet.BetOnTeam == game.away_team_name) {
				removeBet(bet.Index)
			} else if (optionIndex == 1 && bet.BetOnTeam == "Draw") {
				removeBet(bet.Index)
			} else if (optionIndex == 2 && bet.BetOnTeam == game.home_team_name) {
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

	return (
		<Grid item xs={12} key={game.id} >
			<Box className="bet-table-2">

				<Table  >
					{
						(!raw && game.props) &&
						<caption  >
							<Box sx={{ display: 'flex', justifyContent: "space-between", width: '100%' }} >
								<Link to={`/games/${game.league_id}/${game.id}`} style={{ fontWeight: 'bold', textDecoration: 'none', color: "#5b40f6", fontSize: '12px' }}  >More Wagers</Link>
							</Box>
						</caption>
					}

					<TableBody  >

						<Grid item xs={12} >
							<Box className="gc2-card-header">
								<Typography variant="body1" sx={{ fontWeight: 'bold', color: "#ddd" }} >{game.away_team_name} @ {game.home_team_name}</Typography>
								<Typography variant="body1" sx={{ color: "#bbb", fontSize: '13px', fontWeight: 'bold' }} >{startTime}</Typography>
							</Box>
						</Grid>

						<Grid key={Math.floor(Math.random() * 100000000000)} container sx={{ paddingBottom: '1em', paddingTop: '0.5em' }} >

							<Grid item xs={4}>
								<Box className={activeArray[0] ? `bet-option-2 bet-option-2-active` : `bet-option-2`} onClick={() => onOptionClick(0)} >
									<Typography variant="body2" style={activeArray[0] ? { color: 'black', fontWeight: '800' } : { fontWeight: 'bold', color: "#fff", }} >{game.away_team_name.length > 10 && !game.away_team_name.includes(' ') ? `${game.away_team_name.substring(0, 9)}...` : game.away_team_name}</Typography>
									<Typography variant="body2" style={activeArray[0] ? { fontWeight: 'bold', color: 'black' } : { color: "#999", fontWeight: 'bold' }}>{game.away_moneyline}</Typography>
								</Box>
							</Grid>

							<Grid item xs={4}>
								<Box className={activeArray[1] ? `bet-option-2 bet-option-2-active` : `bet-option-2`} onClick={() => onOptionClick(1)} >
									<Typography variant="body2" style={activeArray[1] ? { color: 'black', fontWeight: 'bold' } : { fontWeight: 'bold', color: "#fff" }} >Draw</Typography>
									<Typography variant="body2" style={activeArray[1] ? { fontWeight: 'bold', color: 'black' } : { color: "#999", fontWeight: 'bold' }}>{game.draw_moneyline}</Typography>
								</Box>
							</Grid>

							<Grid item xs={4} >
								<Box className={activeArray[2] ? `bet-option-2 bet-option-2-active` : `bet-option-2`} onClick={() => onOptionClick(2)} >
									<Typography variant="body2" style={activeArray[2] ? { color: 'black', fontWeight: '800' } : { fontWeight: 'bold', color: "#fff" }} >{game.home_team_name}</Typography>
									<Typography variant="body2" style={activeArray[2] ? { fontWeight: 'bold', color: 'black' } : { color: "#999", fontWeight: 'bold' }}>{game.home_moneyline}</Typography>
								</Box >
							</Grid>

						</Grid>

					</TableBody>
				</Table>

			</Box>

		</Grid >
	)

}

