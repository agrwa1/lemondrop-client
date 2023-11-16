import React, { useState, useEffect } from 'react'
import { Typography, Box, Grid } from '@mui/material'
import axios from 'axios'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom'

const AllSports = () => {
	const [sports, setSports] = useState([])

	useEffect(() => {
		axios.get("https://lemondrop-api.onrender.com/api/games/leagues").then(res => {
			const allLeagues = res.data
			const parsedLeagues = { "Basketball": [], "Football": [], "Ice Hockey": [], "Soccer": [] }
			for (let i = 0; i < allLeagues.length; i++) {
				parsedLeagues[allLeagues[i].sport].push({ league_name: allLeagues[i].league_name, league_id: allLeagues[i].league_id })
			}
			console.log(parsedLeagues)
			console.log(Object.keys(parsedLeagues))
			setSports(parsedLeagues)
		})
	}, [])

	return (
		<Grid container>
			{
				Object.keys(sports).map(s => (
					<Grid item xs={12}>
						<Box className="all-sports-item-container">
							<Box>
								<Typography variant="h6" style={{ fontWeight: 'bold', color: "#ccc" }} >All {s}</Typography>
							</Box>

							<Box>
								{
									sports[s].map(l => <LeagueSelector league={l} />)
								}
							</Box>
						</Box>


					</Grid>
				))
			}
		</Grid>
	)
}

const LeagueSelector = ({ league }) => {
	return (
		<Link to={`/games/${league.league_id}`} style={{ textDecoration: 'none' }} >
			<Box class="all-sports-league-selector" >
				<Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '16px', textDecorationColor: 'white' }} >{league.league_name}</Typography>
				<ArrowForwardIosIcon style={{ fontSize: '14px' }} />
			</Box>
		</Link>

	)
}

export default AllSports