import { useState, useEffect } from 'react'

import { Grid, Typography, Box, Button, CircularProgress } from '@mui/material'
import GameCard from './GameCard';
// import gamesData from './gamesData'

import Header from '../layout/Header'
import { useLocation, Navigate } from 'react-router-dom'
import axios from 'axios'

import DesktopBetSlip from '../components/Betslip'

function Games({ pathname }) {
	const [league, setLeague] = useState(useLocation().pathname.split('/')[2])
	// let league = useLocation().pathname.split('/')[2]
	const [leagueParsed, setLeagueParsed] = useState("")
	const [games, setGames] = useState([])
	const [loading, setLoading] = useState(true)
	const [urlChanged, setUrlChanged] = useState(false)
	const [bets, setBets] = useState([])


	useEffect(() => {
		console.log("bets changed", bets)
	}, [bets])

	/*
	Bets schema:
	{
		BetOnTeam: "Los Angeles Rams +6.5",
		BetType: "Spread",
		Odds: -110,
		Timestamp: "Today at 10:01AM",
		Index: 0,
		AwayTeam: "Dallas Cowboys",
		HomeTeam: "Los Angeles Rams",
		GameId: "3bd722d85e1bb286bb75111a0787eb87"
	}

	*/

	// find way to modularize so it can be reusable. 
	//! CURRENTLY IN BETS.JSX
	const addBet = (betOnTeam, betType, odds, awayTeam, homeTeam, gameId) => {
		const newBet = {
			BetOnTeam: betOnTeam,
			BetType: betType,
			Odds: odds,
			// Timestamp: timestamp,
			AwayTeam: awayTeam,
			HomeTeam: homeTeam,
			GameId: gameId,
			Index: bets.length,
		}
		setBets([...bets, newBet])
	}

	const removeBet = (index) => {
		let newBets = bets
		newBets.splice(index, 1)
		// need to update all other bets with correct index
		for (let i = 0; i < newBets.length; i++) {
			newBets[i].Index = i
		}
		setBets([...newBets])
	}



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
		if (league != window.location.pathname.split('/')[2]) {
			setLeague(window.location.pathname.split('/')[2])
			// league = window.location.pathname.split('/')[2]
			setUrlChanged(true)
		}
	})


	useEffect(() => {
		// wont rerender because of empty dependency array
		console.log('refetching...')
		const url = `https://lemondrop-api.onrender.com/api/games/league/${league}`
		axios.get(url).then(res => {
			setGames(res.data)
			setLoading(false)
			setLeagueParsed(res.data[0].sport_title)
		})


	}, [pathname, urlChanged, league])

	return (
		<Box key={league} >

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
							{games.map(game => <GameCard addBet={addBet} bets={bets} game={game} key={game.id} removeBet={removeBet} />)}
						</Grid>

					</Grid>

					{
						(games.length == 0 && !loading) &&
						<Box>
							<Typography variant="h3">there are no {leagueParsed} games active right now.</Typography>
						</Box>
					}






				</Grid>

				<Grid item xs={12} sm={4} className="bet-slip-container">
					<DesktopBetSlip bets={bets} setBets={setBets} removeBet={removeBet} />
				</Grid>
			</Grid>

		</Box >
	)
}



export default Games