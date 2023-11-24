import React, { useEffect, useState } from 'react'

import { Button, Typography, Box, Grid } from '@mui/material'
import { useAuth } from '../App'

import Header from '../layout/Header'
import axios from 'axios'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { CheckCircleOutline } from '@mui/icons-material'

import moment from 'moment'

const Dashboard = () => {
	const { user } = useAuth()
	console.log("user:", user)

	return (
		<div>
			{/* <Box>
				<Header title="My Dashboard" subtitle="This is where you see everything at a glance" />
			</Box> */}

			<Grid container spacing={5} >

				<Grid item xs={6} sm={6} lg={3}>
					<Box sx={{ border: "1px solid black", padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Balance</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2">${user.current_balance}</Typography>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6} lg={3}>
					<Box sx={{ border: "1px solid black", padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Pending</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2">${user.current_pending} </Typography>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6} lg={3}>
					<Box sx={{ border: "1px solid black", padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Free Play</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2">${user.current_free_play} </Typography>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6} lg={3}>
					<Box sx={{ border: "1px solid black", padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Profit</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2">${user.total_profit} </Typography>
					</Box>
				</Grid>

			</Grid>

			<Box sx={{ marginBottom: '3em' }} />

			<Grid container spacing={3}>

				<Grid item xs={12} md={12} lg={8} xl={8}>
					<BetsSection />
				</Grid>

				<Grid item xs={12} md={12} lg={4} xl={4}>
					<ProfileSection />
				</Grid>


			</Grid>
		</div>
	)
}

/*
away_team
bet_amount
bet_cashed
bet_category
bet_on_team
bet_point
bet_price
bet_status
bet_type
bet_verified
game_start_time
home_team
*/

const BetsSection = () => {
	const { user } = useAuth()
	const [bets, setBets] = useState([])

	useEffect(() => {
		const url = `https://lemondrop-api.onrender.com/api/bets/bet/user/${user.user_id}`
		// const url = `http://localhost:8080/api/bets/bet/user/${user.user_id}`
		axios.get(url).then(res => {
			setBets(res.data.slice(0, 10))
		})

	}, [user])

	return (
		<Box className="dashboard-bets-section">
			<Typography variant="h3" className={"recent-bets-header"} >Recent Bets</Typography>
			{
				bets.map(bet => <Bet bet={bet} />)
			}
		</Box>
	)
}

const Bet = ({ bet }) => {
	const toTitleCase = str => {
		// return str.toLowerCase().split(' ').map(function (word) {
		// 	return word.charAt(0).toUpperCase().concat(word.substr(1));
		// }).join(' ');

		return str.toUpperCase()
	}
	const price = bet.bet_price.charAt(0) == "+" ? parseFloat(bet.bet_price.substring(1)) : parseFloat(-1 * bet.bet_price.substring(1))
	const decimalOdds = price > 0 ? 1 + (price / 100) : 1 - (100 / price)
	const toWinAmount = (Math.floor(100 * parseFloat(bet.bet_amount) * decimalOdds) / 100).toFixed(2)
	// const toWinAmount = parseFloat(bet.bet_amount)
	const startTime = moment(bet.game_start_date).calendar()
	console.log(bet.game_start_time)

	return (
		<Box className="bets-section-bet" key={`${bet.away_team} ${bet.home_team} ${bet.bet_point} ${bet.bet_price}`} >
			{

				bet.bet_status == "Pending" &&
				<PendingIcon style={{ color: '#F7CB73', marginTop: '.2em' }} />
			}
			{

				bet.bet_status == "Won" &&
				<CheckCircleIcon style={{ color: '#138001', marginTop: '.2em' }} />
			}
			{

				bet.bet_status == "Lost" &&
				<CancelIcon style={{ color: '#cc0000', marginTop: '.2em' }} />
			}



			<Box className={"bets-section-bet-header"}>
				<Box className={"bets-section-bet-header-top"}>
					<Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px', color: "#2c90ff" }} >{toTitleCase(bet.bet_on_team)}</Typography>
					<Typography variant="body1" style={{ fontSize: '16px', fontWeight: 'bold', color: "#2c90ff" }}> {bet.bet_type.toUpperCase()}</Typography>
				</Box>

				<Box className={"bets-section-bet-header-bottom"}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body1" style={{ fontSize: '16px', color: '#aaa' }} >Wager:&nbsp; </Typography>
						<Typography variant="body1" style={{ fontWeight: 'bold', color: '#eee', fontSize: '16px' }} > ${parseFloat(bet.bet_amount).toFixed(2)}</Typography>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body1" style={{ fontSize: '16px', color: '#aaa' }} >To Win:&nbsp; </Typography>
						<Typography variant="body1" style={{ fontWeight: 'bold', color: '#eee', fontSize: '16px' }} > ${toWinAmount}</Typography>
					</Box>
				</Box>

				<Box className={"bets-section-bet-header-bottom"}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
					</Box>
				</Box>


			</Box>
		</Box>
	)
}

const ProfileSection = () => {
	const { signOut, user } = useAuth()
	const fullName = (user.first_name + " " + user.last_name).toUpperCase()

	return (
		<Box className={"profile-section-profile-header"} >
			<Box className={"profile-section-main"}>
				<Typography variant="h4" style={{ fontWeight: 'bold' }} >{fullName}</Typography>
				<Typography variant="h6" style={{ color: "#999" }} >{user.email}</Typography>
				<Typography variant="h6" style={{ color: "#999" }} >{user.phone_number}</Typography>
			</Box>
			<Button variant="contained" onClick={signOut}>Sign Out</Button>
		</Box>
	)
}

export default Dashboard
