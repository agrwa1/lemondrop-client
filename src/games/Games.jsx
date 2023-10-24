import { useState, useEffect } from 'react'

import { Grid, Typography, Box, Button, CircularProgress } from '@mui/material'
import GameCard from './GameCard';
// import gamesData from './gamesData'

import Header from '../layout/Header'
import { useLocation, Navigate } from 'react-router-dom'
import axios from 'axios'




function Games({ }) {
	const league = useLocation().pathname.split('/')[2]

	if (league != "nba" && league != "nfl" && league != "nhl" && league != "mlb") {
		return <Navigate to="/404" />
	}

	const apiKey = "e0ae2e9cd2c145da9659ce53ddbc4442"
	const leagueParsed = "americanfootball_nfl"
	const url = `https://api.the-odds-api.com/v4/sports/${leagueParsed}/odds?apiKey=${apiKey}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`

	const [games, setGames] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios.get(url).then(res => {
			// console.log(res.data)
			setGames(res.data)
			console.log("games: ", games)
			setLoading(false)
		})

	}, [])


	return (
		<Box>
			<Header title={`${league.toUpperCase()} Games`} subtitle="Games Across All Available Sports" />


			<Box sx={{ marginBottom: '2em' }} />

			{
				loading &&
				<Box sx={{ display: 'flex', justifyContent: 'center' }} >
					<CircularProgress />
				</Box>
			}

			{
				games.length == 0 &&
				<Box>
					<Typography variant="h3">there are no {league.toUpperCase()} games active right now.</Typography>
				</Box>
			}



			<Grid container spacing={5} >
				{games.map(game => <GameCard game={game} key={game.id} />)}
			</Grid>
		</Box>
	)
}


export default Games