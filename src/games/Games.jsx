import { useState, useEffect } from 'react'

import { Grid, Typography, Box, Button, CircularProgress } from '@mui/material'
import GameCard from './GameCard';
// import gamesData from './gamesData'

import Header from '../layout/Header'
import { useLocation, Navigate } from 'react-router-dom'
import axios from 'axios'


function Games({ pathname }) {
	let league = useLocation().pathname.split('/')[2]
	const [leagueParsed, setLeagueParsed] = useState("")
	const [games, setGames] = useState([])
	const [loading, setLoading] = useState(true)
	const [urlChanged, setUrlChanged] = useState(false)
	const [bets, setBets] = useState([])

	/*
		Bet schema:
			- Team bet on (home away)
			- Type of bet (ML, Spread, Totals, PropsName, etc)
			- Odds (-110...)
			- timestamp momentized
			- wager amount
			- towin amount
			- index in bet array
			- game id
			= time placed
			= user placing
			= 

	*/

	const validSports = [
		'americanfootball_nfl',
		'americanfootball_ncaaf',
		'basketball_nba',
		'basketball_ncaab',
		'icehockey_nhl',
		'soccer_uefa_champs_league',
	]

	if (!validSports.includes(league)) {
		return <Navigate to="/404" />
	}

	useEffect(() => {
		console.log(league)
		console.log(window.location.pathname.split('/')[2])
		if (league != window.location.pathname.split('/')[2]) {
			league = window.location.pathname.split('/')[2]
			setUrlChanged(true)
		}
	})


	useEffect(() => {
		// wont rerender because of empty dependency array
		console.log('refetching...')
		const url = `https://lemondrop-api.onrender.com/api/games/${league}`
		axios.get(url).then(res => {
			setGames(res.data)
			setLoading(false)
			setLeagueParsed(res.data[0].sport_title)
		})


	}, [pathname, urlChanged])

	return (
		<Box>

			{
				loading &&
				<Box sx={{ display: 'flex', justifyContent: 'center' }} >
					<CircularProgress />
				</Box>
			}

			<Grid container >
				<Grid item xs={12}>
					<Box sx={{ height: '2em' }}></Box>
				</Grid>
				<Grid item xs={12} md={8} className="betting">


					<Grid container className="games-header grid-games-header"  >
						<Grid item xs={12} container className="main-header">
							<Grid item xs={6} className="games-header-name" >
								<Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '20px' }} >{leagueParsed}</Typography>
							</Grid>

							<Grid item xs={2} className="header-stat"  >
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: "#666" }}>
									<Typography variant="body2" style={{ fontSize: '12px' }} >SPREAD</Typography>
								</Box>
							</Grid>
							<Grid item xs={2}>
								<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#666' }}>
									<Typography variant="body2" style={{ fontSize: '12px' }} >MONEY</Typography>
								</Box>
							</Grid>
							<Grid item xs={2}>
								<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#666' }}>
									<Typography variant="body2" style={{ fontSize: '12px' }} >TOTAL</Typography>
								</Box>
							</Grid>
						</Grid>


						<Grid container>
							{games.map(game => <GameCard game={game} key={game.id} />)}
						</Grid>

					</Grid>



					{
						games.length == 0 &&
						<Box>
							<Typography variant="h3">there are no {leagueParsed} games active right now.</Typography>
						</Box>
					}




				</Grid>

				<Grid item xs={12} sm={4} className="bet-slip-container">
					<DesktopBetSlip bets={bets} />
				</Grid>

			</Grid>

		</Box >
	)
}


const DesktopBetSlip = ({ bets }) => {
	return (
		<Box className="bet-slip">

			<Box className="bet-slip-header">
				<Box className="bet-slip-header-count">
					{bets.length}
				</Box>
				<Typography variant="h6" style={{ fontWeight: 'bold', fontSize: "16px", color: '#ccc' }} >Betslip</Typography>
			</Box>

			<Box className="bet-slip-divider" />

			{
				bets.length == 0 &&
				<Box className="empty-betslip-container">
					<Typography variant="h6">Empty betslip</Typography>
				</Box>
			}


			{
				bets.map(bet =>
					<Box className="bet-slip-option">
						<Typography variant="h6">bet.name</Typography>
					</Box>
				)
			}

		</Box>
	)
}

export default Games