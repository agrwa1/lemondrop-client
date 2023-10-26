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

	const validSports = [
		'americanfootball_nfl',
		'americanfootball_ncaaf',
		'basketball_nba',
		'basketball_ncaab',
		'icehockey_nhl'
	]

	if (!validSports.includes(league)) {
		return <Navigate to="/404" />
	}


	const url = `https://lemondrop-api.onrender.com/api/games/${league}`

	const [games, setGames] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios.get(url).then(res => {
			setGames(res.data)
			setLoading(false)
			if (games.length > 0) {
				setLeagueParsed(res.data[0].sport_title)
			}
		})


	}, [])


	return (
		<Box>
			<Header title={`${leagueParsed} Games`} subtitle={`Games Across the ${leagueParsed}`} />


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
					<Typography variant="h3">there are no {leagueParsed} games active right now.</Typography>
				</Box>
			}



			<Grid container spacing={5} >
				{games.map(game => <GameCard game={game} key={game.id} />)}
			</Grid>
		</Box>
	)
}


export default Games