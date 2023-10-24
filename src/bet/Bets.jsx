import React, { useState, useEffect } from 'react'

import { Grid, Typography, Box, Button, Input, InputLabel, TextField, FormControl, Snackbar } from '@mui/material'
import OutlinedInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';

import { useAuth } from '../App'

import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Bets = () => {
	const [game, setGame] = useState({})
	const [bets, setBets] = useState([])
	const [submit, setSubmit] = useState(false)
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)

	const [showSnackbar, setShowSnackbar] = useState(false)

	const navigate = useNavigate()

	// improve parsing
	const pathname = useLocation().pathname
	const gameId = pathname.split('/')[2]

	const datetime = `${(new Date(game.CommenceTime)).toLocaleDateString()} ${(new Date(game.CommenceTime)).toLocaleTimeString()}`


	useEffect(() => {
		axios.get(`http://localhost:8080/api/games/game/${gameId}`).then(res => {
			setGame(res.data)
		}).catch(e => { navigate("/404") })
	}, [])

	const addBet = (team, point, price) => {
		setBets([{ team, point, price }, ...bets])
	}

	const removeBet = (team, point, price) => {
		const validBets = []
		for (let i = 0; i < bets.length; i++) {
			if (bets[i].team === team && Math.abs(bets[i].price) === Math.abs(price)) {
				continue
			} else {
				validBets.push(bets[i])
			}
		}
		setBets(validBets)
	}

	const submitBets = () => {
		setSubmit(true)
		// setShowSnackbar(true)


		// const error = true;
		// if (error) {
		// 	setError(true)
		// } else {
		// 	setSuccess(true)
		// }
	}



	return (
		<Box  >

			<Grid container spacing={10} >
				{/* game stats */}
				<Grid item xs={12} sm={12} md={12} lg={8}>
					{/* top page: home vs away */}
					<Grid container spacing={5} justifyContent="center" alignItems="center" >
						<Grid item xs={12} sm={12} md={5} >
							<Typography textAlign="center" variant="h2">{game.Away} </Typography>
							<Typography textAlign="center" variant="h6" sx={{ color: 'gray' }}>(Away)</Typography>
						</Grid>
						<Grid item xs={12} sm={12} md={2} >
							<Typography textAlign="center" variant="h2">vs</Typography>
							<Typography textAlign="center" variant="h6" sx={{ color: 'gray' }}>{datetime}</Typography>

						</Grid>
						<Grid item xs={12} sm={12} md={5}>
							<Typography textAlign="center" variant="h2">{game.Home} </Typography>
							<Typography textAlign="center" variant="h6" sx={{ color: 'gray' }}>(Home)</Typography>
						</Grid>
					</Grid>

					<hr />

					<Grid container spacing={5} justifyContent="center" >
						<Grid item xs={4} sm={4} md={5} >
							<Typography textAlign="center" variant="h6" sx={{ color: "gray" }} >Away</Typography>
						</Grid>
						<Grid item xs={4} sm={4} md={2} ></Grid>
						<Grid item xs={4} sm={4} md={5}>
							<Typography textAlign="center" variant="h6" sx={{ color: 'gray' }} >Home </Typography>
						</Grid>
					</Grid>

					<Box sx={{ margin: '5em' }} />

					<Grid container spacing={5} justifyContent="center" >
						<BetOption point={game.SpreadAwayPoint} price={game.SpreadAwayPrice} addBet={addBet} team={game.Away} removeBet={removeBet} />
						<BetSeparator type="Spread" />
						<BetOption point={game.SpreadHomePoint} price={game.SpreadHomePrice} addBet={addBet} team={game.Home} removeBet={removeBet} />
					</Grid>

					<Box sx={{ margin: '5em' }} />


					<Grid container spacing={5} justifyContent="center" >
						<BetOption point={game.MoneylineAway} addBet={addBet} team={game.Away} removeBet={removeBet} />
						<BetSeparator type="MLine" />
						<BetOption point={game.MoneylineHome} addBet={addBet} team={game.Home} removeBet={removeBet} />
					</Grid>

					<Box sx={{ margin: '6em' }} />


					<Grid container spacing={5} justifyContent="center" >
						<BetOption point={game.OverPoint} price={game.OverPrice} addBet={addBet} team={"Over"} removeBet={removeBet} />
						<BetSeparator type="Totals" />
						<BetOption point={game.UnderPoint} price={game.UnderPrice} addBet={addBet} team={"Under"} removeBet={removeBet} />
					</Grid>

				</Grid>


				{/* bet slip */}
				<Grid item xs={12} sm={12} md={12} lg={4}  >
					<Box sx={{ padding: '1em', border: '1px solid lightgray', borderRadius: '10px' }}  >
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography textAlign="left" variant="h6" sx={{ fontWeight: 'bold' }}>BET SLIP</Typography>
						</Box>

						<Box sx={{ margin: '3em' }} />

						{
							bets.length === 0 &&

							<Box  >
								<Typography sx={{ fontWeight: 'bold' }} variant="body1" textAlign="center" >Your picks will show up here</Typography>
								<Typography variant="body2" textAlign="center">Add picks for this game and they will appear here.</Typography>
							</Box>
						}



						<Box>
							{
								bets.map(b => <BetSlipOption key={`${b.team}${b.point}`} team={b.team} point={b.point} price={b.price} submit={submit} game={game} gameId={gameId} />)
							}
						</Box>

						{
							bets.length > 0 &&
							<Button sx={{ width: '100%', fontWeight: "bold" }} onClick={submitBets} variant="contained" >
								Place bets
							</Button>
						}

						<Snackbar
							open={showSnackbar}
							autoHideDuration={6000}
							onClose={() => setShowSnackbar(false)}
							d message="Submitting all bets..."
						/>
						<Snackbar
							open={error}
							autoHideDuration={6000}
							onClose={() => setError(false)}
							d message="Error: Please try again"
						/>
						<Snackbar
							open={success}
							autoHideDuration={6000}
							onClose={() => setSuccess(false)}
							d message="Successfully submitted all bets"
						/>

					</Box>
				</Grid>
			</Grid>


		</Box>
	)
}

const BetOption = ({ point, price, addBet, removeBet, team }) => {

	const [active, setActive] = useState(false)
	const [added, setAdded] = useState(false)
	const [disabled, setDisabled] = useState((point == 0 || price == 0 || point == "-") ? true : false)
	const [newPoint, setNewPoint] = useState(point)
	const [newPrice, setNewPrice] = useState(price)



	useEffect(() => {
		if (point == 0) {
			setNewPoint("-")
			setNewPrice("")
			setDisabled(true)
		}
		if (disabled) {
			return
		}
		if (active && !added) {
			// MLINE
			if (!price) {
				if (point > 0) {
					addBet(team, "ML", `+${point}`)
					setAdded(true)
				}
				else {
					addBet(team, "ML", point)
					setAdded(true)
				}
			}

			// TOTALS
			else if (team == "Over" || team == "Under") {
				addBet(team, point, price)
				setAdded(true)
			}

			// SPREAD
			else {
				// SPREAD
				if (point > 0) {
					point = `+${point}`
				}
				setAdded(true)
				addBet(team, point, price)
			}

		} else {
			if (!price) {
				removeBet(team, "ML", point)
				setAdded(false)
			} else {
				removeBet(team, point, price)
				setAdded(false)
			}
		}
	}, [active, disabled, newPoint, newPrice])

	const activate = () => {
		if (!disabled) { setActive(true) }
	}

	return (
		<Grid item xs={4} sm={4} md={5}  >
			<Box sx={{ border: '1px solid lightgray' }} className={active ? "bet-box-active" : "bet-box-inactive"} onClick={activate} >
				<Typography textAlign="center" sx={{ fontWeight: 'bold' }} variant="h6">{newPoint > 0 ? `+${newPoint}` : newPoint} </Typography>
				<Typography textAlign="center" variant="body1" sx={{ color: 'gray' }}>{newPrice > 0 ? `+${newPrice}` : newPrice} </Typography>
			</Box>
		</Grid>
	)
}

const BetSeparator = ({ type }) => {
	return (
		<Grid item xs={4} sm={4} md={2}  >
			<Typography textAlign="center" variant="h5" sx={{ color: 'gray' }} >{type}</Typography>
		</Grid>
	)
}

const BetSlipOption = ({ team, point, price, submit, game, gameId }) => {
	const { user } = useAuth()
	console.log(user)
	const [amount, setAmount] = useState(10)

	const submitBet = () => {
		console.log("submitting bet with team: " + team)
		axios.post("http://localhost:8080/api/bets/add", {
			user_id: user.user_id,
			"user_email": user.email,
			"user_balance": user.current_balance,
			"user_availability": user.current_availability,
			"user_pending": user.current_pending,
			"user_free_play": user.current_free_play,

			"game_id": gameId,
			"home_team": game.Home,
			"away_team": game.Away,
			"game_start_time": game.CommenceTime,

			"bet_type": team == "Over" || team == "Under" ? "Totals" : point == "ML" ? "Moneyline" : "Spread",
			"bet_on_team": team,
			"bet_point": point,
			"bet_price": price,
			"bet_amount": amount,
		})
	}

	useEffect(() => {
		if (submit) {
			submitBet()
		}
	}, [submit])

	return (
		<Box sx={{ marginBottom: '2em', marginTop: '1em' }} >
			<Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }} >
				<Typography sx={{ fontWeight: "bold" }} variant='body1'>{team}</Typography>
				<Typography sx={{ fontWeight: "bold" }} variant='body2'>{point}</Typography>
				<Typography sx={{ fontWeight: "bold" }} variant='body2'>{price}</Typography>
			</Box>


			<Box>

				<FormControl fullWidth sx={{ m: 1 }}>
					<Input
						d startAdornment={<InputAdornment position="start">$</InputAdornment>}
						label="Amount"
						onChange={e => setAmount(e.target.value)}
						placeholder={amount}
					/>
				</FormControl>
			</Box>



		</Box>
	)
}



export default Bets
