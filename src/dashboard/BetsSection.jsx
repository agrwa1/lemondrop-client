import React, { useEffect, useState } from 'react'

import { Button, Typography, Box, Grid, CircularProgress } from '@mui/material'
import { useAuth } from '../App'

import Header from '../layout/Header'
import axios from 'axios'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { CheckCircleOutline } from '@mui/icons-material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import moment from 'moment'

const BetsSection = () => {
	const { user } = useAuth()
	const [bets, setBets] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		const url = `https://lemondrop-api.onrender.com/api/bets/bet/user/${user.user_id}`
		// const url = `http://localhost:8080/api/bets/bet/user/${user.user_id}`
		axios.get(url).then(res => {
			setBets(res.data.slice(0, 10))
			setLoading(false)
		})

	}, [user])

	if (loading) {
		return (
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		)
	} else return (
		<Box className="dashboard-bets-section">
			{/* <Typography variant="h3" className={"recent-bets-header"} >Recent Bets</Typography> */}
			{
				bets.map(bet => bet.is_parlay ? <Parlay parlay={bet} /> : <Bet bet={bet} />)
			}
			{
				bets.length == 0 && <Typography variant="h4" sx={{ color: "#aaa" }}>No Bets Here Yet! Place Some Bets and See Them Here.</Typography>
			}
		</Box>
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
is_parlay
*/

const Parlay = ({ parlay }) => {
	const [open, setOpen] = useState(false)

	// console.log(parlay)
	const price = parlay.bet_price.charAt(0) == "+" ? parseFloat(parlay.bet_price.substring(1)) : parseFloat(-1 * parlay.bet_price.substring(1))
	const decimalOdds = price > 0 ? 1 + (price / 100) : 1 - (100 / price)
	const toWinAmount = (Math.floor(100 * parseFloat(parlay.bet_amount) * decimalOdds) / 100).toFixed(2)

	return (
		<Box className={"parlay-container"}>
			<StatusIcon status={parlay.bet_status} />
			<Box onClick={() => setOpen(!open)} className={"bets-parlay-inner-container"}>
				<Grid container>
					<Grid item xs={12}>
						<Box className={"bets-parlay-header"}>
							<Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px', color: "#eee", }} >{parlay.bets.length}-LEG PARLAY</Typography>
							<Box className="bets-parlay-odds-dd">
								<Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px', color: "#bbb" }} >{parlay.bet_price}</Typography>
								{
									open &&
									<KeyboardArrowUpIcon onClick={() => setOpen(false)} sx={{ fontSize: '30px', marginLeft: '0.5em', color: '#ccc' }} />
								}
								{
									!open &&
									<KeyboardArrowDownIcon onClick={() => setOpen(true)} sx={{ fontSize: '30px', marginLeft: '0.5em', color: '#ccc' }} />
								}
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12}>
						<Box sx={{ width: '100%', margin: '1em 0' }}>
							{
								open && parlay.bets.map(b => <ParlaySubBet bet={b} key={b.home_team} />)
							}
						</Box>
					</Grid>

					<Grid item xs={12}>
						{
							parlay.bet_status == "Pending" &&
							<Typography variant="body1" sx={{ color: "#aaa", marginTop: "0.5em" }}>To Win: ${toWinAmount}</Typography>
						}
						{
							parlay.bet_status == "Won" &&
							<Typography variant="body1" sx={{ color: "#aaa", marginTop: "0.5em" }}>Won: ${toWinAmount}</Typography>
						}
					</Grid>
				</Grid>
			</Box>
		</Box >
	)
}

const ParlaySubBet = ({ bet }) => {
	const toTitleCase = str => {
		return str.toUpperCase()
	}

	const price = bet.bet_price.charAt(0) == "+" ? parseFloat(bet.bet_price.substring(1)) : parseFloat(-1 * bet.bet_price.substring(1))
	const decimalOdds = price > 0 ? 1 + (price / 100) : 1 - (100 / price)
	const toWinAmount = (Math.floor(100 * parseFloat(bet.bet_amount) * decimalOdds) / 100).toFixed(2)
	const startTime = moment(bet.game_start_date).calendar()

	return (
		<Box className="bets-section-subbet" key={`${bet.away_team} ${bet.home_team} ${bet.bet_point} ${bet.bet_price}`} >

			<StatusIcon status={bet.bet_status} />


			<Box className={"bets-section-bet-header"}>
				<Grid container>
					<Grid item xs={12} >
						<Box className={"bets-bet-name-container"}>
							<Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '16px', color: "#eee" }} >{toTitleCase(bet.bet_on_team)}</Typography>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box className={"bets-bet-price-container"}>
							<Typography variant="body1" style={{ fontSize: '14px', letterSpacing: '.06rem', color: "#aaa" }} >{bet.bet_type.toUpperCase()}</Typography>
							<Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '16px', color: "#bbb" }} >{bet.bet_price}</Typography>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box className={"bets-bet-game-container"}>
							<Typography variant="body1" style={{ fontSize: '16px', color: "#666" }} >{bet.away_team} @ {bet.home_team}</Typography>

						</Box>
					</Grid>
				</Grid>


			</Box>
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
	const startTime = moment(bet.game_start_date).calendar()

	return (
		<Box className="bets-section-bet" sx={{ backgroundColor: '#121212' }} key={`${bet.away_team} ${bet.home_team} ${bet.bet_point} ${bet.bet_price}`} >

			<StatusIcon status={bet.bet_status} />


			<Box className={"bets-section-bet-header"}>
				<Grid container>
					<Grid item xs={12} >
						<Box className={"bets-bet-name-container"}>
							<Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px', color: "#eee" }} >{toTitleCase(bet.bet_on_team)}</Typography>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box className={"bets-bet-price-container"}>
							<Typography variant="body1" style={{ fontSize: '16px', letterSpacing: '.06rem', color: "#aaa" }} >{bet.bet_type.toUpperCase()}</Typography>
							<Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px', color: "#bbb" }} >{bet.bet_price}</Typography>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box className={"bets-bet-game-container"}>
							<Typography variant="body1" style={{ fontSize: '16px', color: "#666" }} >{bet.away_team} @ {bet.home_team}</Typography>
							<Typography variant="body1" sx={{ color: "#aaa", marginTop: "0.5em" }}>To Win: ${toWinAmount}</Typography>

						</Box>
					</Grid>
				</Grid>


			</Box>
		</Box>
	)
}

const StatusIcon = ({ status }) => {
	return (
		<Box>

			{
				status == "Pending" &&
				<PendingIcon style={{ color: '#F7CB73', marginTop: '.2em' }} />
			}
			{
				status == "Won" &&
				<CheckCircleIcon style={{ color: '#138001', marginTop: '.2em' }} />
			}
			{
				status == "Lost" &&
				<CancelIcon style={{ color: '#cc0000', marginTop: '.2em' }} />
			}
		</Box>
	)
}

export default BetsSection