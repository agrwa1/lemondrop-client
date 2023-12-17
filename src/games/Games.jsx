import { useState, useEffect } from 'react'

import { Grid, Typography, Box, Button, CircularProgress, Snackbar } from '@mui/material'
import GameCard from './GameCard';
// import gamesData from './gamesData'

import Header from '../layout/Header'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import BetSlip from '../components/Betslip'

function Games({ pathname }) {
	const [league, setLeague] = useState(useLocation().pathname.split('/')[2])
	// let league = useLocation().pathname.split('/')[2]
	const [leagueParsed, setLeagueParsed] = useState("")
	const [games, setGames] = useState([])
	const [loading, setLoading] = useState(true)
	const [urlChanged, setUrlChanged] = useState(false)
	const [bets, setBets] = useState([])

	const [success, setSuccess] = useState(false)
	const [failure, setFailure] = useState(false)


	// find way to modularize so it can be reusable. 
	//! CURRENTLY IN BETS.JSX
	const addBet = (betOnTeam, betType, price, point, awayTeam, homeTeam, gameId, gameHash) => {
		const newBet = {
			BetOnTeam: betOnTeam,
			BetType: betType,
			Price: price,
			Point: point,
			// Odds: odds,
			// Timestamp: timestamp,
			AwayTeam: awayTeam,
			HomeTeam: homeTeam,
			GameId: gameId,
			GameHash: gameHash,
			Index: bets.length,
			Amount: 1
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

	// const validSports = [
	// 	'football_nfl',
	// 	'football_ncaaf',
	// 	'basketball_nba',
	// 	'basketball_ncaab',
	// 	'icehockey_nhl',
	// 	'soccer_champions_league',
	// 	'soccer_mexico_liga_mx',
	// ]

	// if (!validSports.includes(league)) {
	// 	return <Navigate to="/404" />
	// }

	useEffect(() => {
		if (league != window.location.pathname.split('/')[2]) {
			setLeague(window.location.pathname.split('/')[2])
			// league = window.location.pathname.split('/')[2]
			setUrlChanged(true)
		}
	})


	useEffect(() => {
		// wont rerender because of empty dependency array
		setLoading(true)
		const url = `https://lemondrop-api.onrender.com/api/games/league/${league}`
		axios.get(url).then(res => {
			setGames(res.data)
			setLoading(false)
			setLeagueParsed(res.data[0].league)
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
					<Box sx={{ height: '1em' }}></Box>
				</Grid>

				<Grid item xs={12} md={8} className="betting">
					<Grid container className="games-header grid-games-header"  >
						{
							(games.length == 0 && !loading) &&
							<Box>
								<Typography variant="h3">Sorry, No Active Games Right Now!</Typography>
							</Box>
						}
						{
							games.length > 0 && games[0].game_type == '1' &&
							<Type1GamesHeader leagueName={leagueParsed} sport={games[0].sport} />
						}
						{
							games.length > 0 && games[0].game_type == '2' &&
							<Type2GamesHeader leagueName={leagueParsed} sport={games[0].sport} />
						}

						<Grid container>
							{games.map(game => <GameCard addBet={addBet} bets={bets} game={game} key={game.id} removeBet={removeBet} />)}
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={4} className="bet-slip-container">
					<BetSlip bets={bets} setBets={setBets} removeBet={removeBet} setSuccess={setSuccess} setFailure={setFailure} />
				</Grid>

				<Snackbar open={success} message="Bets Successfully Placed!" onClose={() => setSuccess(false)} autoHideDuration={6000} />
				<Snackbar open={failure} message="Failed to Place Bets" onClose={() => setFailure(false)} autoHideDuration={6000} />
			</Grid>

		</Box >
	)
}

const Type1GamesHeader = ({ leagueName, sport }) => {
	return (

		<Grid item xs={12} container className="main-header">
			<Grid item xs={6} className="games-header-name" >
				<Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', color: "#aaa" }} > {sport} / {leagueName}</Typography>
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
	)
}

const Type2GamesHeader = ({ leagueName, sport }) => {
	return (

		<Grid item xs={12} container className="main-header">
			<Grid item xs={12} className="games-header-name" >
				<Box style={{ width: '100%', display: 'flex', marginBottom: '2em' }}>
					<Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px', color: "#aaa" }} > {sport} / {leagueName}</Typography>
				</Box>
			</Grid>

			<Grid item xs={4} className="header-stat"  >
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: "#666" }}>
					<Typography variant="body2" style={{ fontSize: '12px' }} >AWAY</Typography>
				</Box>
			</Grid>
			<Grid item xs={4}>
				<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#666' }}>
					<Typography variant="body2" style={{ fontSize: '12px' }} >DRAW</Typography>
				</Box>
			</Grid>
			<Grid item xs={4}>
				<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', color: '#666' }}>
					<Typography variant="body2" style={{ fontSize: '12px' }} >HOME</Typography>
				</Box>
			</Grid>
		</Grid>
	)
}



export default Games