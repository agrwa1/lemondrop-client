import React, { useState, useEffect } from 'react'
import { Typography, Box, Grid, Button } from '@mui/material'
import axios from 'axios'

const Picks = ({ pathname }) => {
	const [allPicks, setAllPicks] = useState({})
	const [markets, setMarkets] = useState([])
	const [currentMarket, setCurrentMarket] = useState("")


	useEffect(() => {
		axios.get('http://localhost:8080/api/picks/basketball_nba').then(res => {
			console.log(res.data)
			setAllPicks(res.data)
			console.log(Object.keys(res.data))
			setCurrentMarket(Object.keys(res.data)[0])
		})
		axios.get('http://localhost:8080/api/picks/basketball_nba/markets').then(res => {
			setMarkets(res.data)
		})
	}, [])

	return (
		<div>
			<h1>Picks</h1>
			<Box className="picks-selector-container">
				{
					markets.map(m => <Box onClick={() => setCurrentMarket(m)} className="picks-markets-option-selector" ><Typography variant="body2" >{m}</Typography></Box>)
				}
			</Box>
			<Grid container spacing={3}>
				{
					currentMarket && allPicks[currentMarket].map(p => <PickCard pick={p} />)
				}
			</Grid>
		</div>
	)
}

const PickCard = ({ pick }) => {
	console.log(pick)
	return (
		<Grid item xs={12} sm={12} md={6} lg={4}>
			<Box className="pick-card" >
				<Box className="pick-card-info">
					<img src={pick.player_picture_url} className="player-picture" ></img>
					<Box className="pick-card-info-right">
						<Box>
							<Typography variant="h3" style={{ fontWeight: 'bold', fontSize: "20px" }}>{pick.player_name}</Typography>
							<Typography variant="h5" style={{ fontWeight: 'bold', fontSize: '16px', color: "#aaa", margin: '0.5em 0' }}>{pick.team_position}</Typography>
						</Box>

						<Box className="pick-card-point-display">
							<Typography variant="h2" style={{ fontWeight: 'bold', fontSize: "24px", marginBottom: "0.25em" }}>{pick.point}</Typography>
							<Typography variant="h6" style={{ color: "#aaa", fontSize: "18px" }} >{pick.market}</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Grid>
	)
}

export default Picks
