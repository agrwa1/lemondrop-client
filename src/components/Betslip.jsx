import React, { useRef, useState, useEffect } from 'react'
import { Grid, Typography, Box, Button, ButtonGroup, Input, InputLabel, TextField, FormControl, Snackbar, Fab, Badge, Backdrop } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import axios from 'axios'

import { useAuth } from '../App'

const Betslip = ({ bets, setBets, removeBet, setSuccess, setFailure }) => {
	const { user } = useAuth()


	const [mobileBets, setMobileBets] = useState(bets)
	const deleteAllBets = () => {
		setBets([])
	}
	const [isParlay, setIsParlay] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	const [parlayOdds, setParlayOdds] = useState(0)

	useEffect(() => {
		// calculating parlay odds
		let currentOdds = 1
		bets.forEach(bet => {
			let priceFloat = 0
			if (bet.Price[0] == "+") {
				priceFloat = parseInt(bet.Price.substring(1, bet.Price.length))
			} else {
				priceFloat = parseInt(bet.Price.substring(1, bet.Price.length)) * -1
			}
			const decimalOdds = priceFloat > 0 ? 1 + (priceFloat / 100) : 1 - (100 / priceFloat)
			currentOdds *= decimalOdds
		})

		let americanOdds = 0
		if (currentOdds > 2) {
			americanOdds = (currentOdds - 1) * 100
			setParlayOdds(`+${americanOdds.toFixed(0)}`)
		} else {
			americanOdds = -100 / (currentOdds - 1)
			setParlayOdds(`-${americanOdds.toFixed(0)}`)
		}

	}, [bets])

	const submitBets = () => {
		const url = "https://lemondrop-api.onrender.com/api/bets/bet"
		// const url = "http://localhost:8080/api/bets/bet"

		if (bets.length >= 2 && isParlay) {
			submitBetsParlay()
		}

		else {
			submitBetsSingles(url)
		}
	}

	const submitBetsParlay = () => {

	}

	const submitBetsSingles = (url) => {
		bets.forEach(bet => {
			if (!bet.Price || !bet.Amount) {
				console.log("failure")
				setFailure(true)
				return
			}
		})

		for (let i = 0; i < bets.length; i++) {
			const bet = bets[i]
			console.log(bet)
			var date = new Date();
			var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
				date.getUTCDate(), date.getUTCHours(),
				date.getUTCMinutes(), date.getUTCSeconds());

			const b = {
				user_id: user.user_id,
				user_email: user.email,

				game_id: bet.GameId,
				game_hash: bet.GameHash,
				home_team: bet.HomeTeam,
				away_team: bet.AwayTeam,

				bet_type: bet.BetType,
				bet_on_team: bet.BetOnTeam,

				bet_point: bet.Point,
				bet_price: bet.Price,
				bet_amount: String(bet.Amount),

				bet_placed_time: new Date(now_utc),
			}
			axios.post(url, b).then(() => {
				console.log(b)
				console.log("bet placed")
				setSuccess(true)
				deleteAllBets()
			})
		}
	}

	const handleMobileDeleteAll = () => {
		setMobileOpen(false)
		deleteAllBets()
	}

	useEffect(() => {
		setMobileBets(bets)
	}, [bets])

	return (
		<Box style={{ width: '100%' }} >

			<Box className="bet-slip">
				<Box className="bet-slip-content">

					<Box className="bet-slip-header">
						<Box className="bet-slip-header-main">
							<Box className="bet-slip-header-count">
								{bets.length}
							</Box>
							<Typography variant="h6" style={{ fontWeight: 'bold', fontSize: "16px", color: '#ccc' }} >Betslip</Typography>
						</Box>
						{
							bets.length >= 2 &&
							<Box className="bet-type-selector">
								<ButtonGroup>
									<Button variant={isParlay ? "outlined" : "contained"} onClick={() => setIsParlay(false)} >Singles</Button>
									<Button variant={isParlay ? "contained" : "outlined"} onClick={() => setIsParlay(true)}>Parlay</Button>
								</ButtonGroup>
							</Box>
						}
					</Box>


					{
						isParlay && bets.length >= 2 &&
						<Box className="parlay-options">
							<Box className="parlay-odds-display">
								<Typography variant="body1" style={{ fontWeight: 'bold', color: '#bbb' }}>Parlay Odds</Typography>
								<Typography variant="body1" style={{ fontWeight: 'bold', color: '#bbb' }} >{parlayOdds}</Typography>
							</Box>
							<Box className="wager-win-amts" sx={{ marginTop: "1em" }} >
								<FormControl fullWidth sx={{ mr: 1 }}>
									<InputLabel htmlFor="outlined-adornment-amount">Wager</InputLabel>
									<OutlinedInput
										id="outlined-adornment-amount"
										startAdornment={<InputAdornment position="start">$</InputAdornment>}
										label="Wager"
										pattern="[0-9]*"
									// value={amount}
									// placeholder={amount}
									// color={color}
									// onChange={wagerChanged}
									/>
								</FormControl>

								<FormControl fullWidth sx={{ ml: 1 }}>
									<InputLabel htmlFor="outlined-adornment-amount">To Win</InputLabel>
									<OutlinedInput
										disabled
										id="outlined-adornment-amount"
										startAdornment={<InputAdornment position="start">$</InputAdornment>}
										label="To Win"
									// value={toWinAmount}
									/>
								</FormControl>
							</Box>
						</Box>

					}

					{
						bets.length == 0 &&
						<Box className="empty-betslip-container">
							<Typography variant="h6" style={{ color: '#aaa' }}>EMPTY BETSLIP</Typography>

						</Box>
					}

					{
						bets.length > 0 &&

						<Box className="bet-slip-option-container">
							{
								bets.map(bet =>
									<BetslipOption key={bet.BetOnTeam} isParlay={isParlay} bet={bet} removeBet={removeBet} />
								)
							}
						</Box>
					}
				</Box>
				{
					bets.length > 0 &&
					<Box className="bet-slip-actions">


						<Button fullWidth variant="outlined" onClick={deleteAllBets} style={{ border: '0.5px solid #ff3008', margin: '1em 0', color: "#ff3008", fontWeight: 'bold', display: 'flex', alignItems: "center" }} >
							<DeleteOutlinedIcon />
							Delete All
						</Button>
						<Button fullWidth variant="contained" onClick={submitBets} style={{ fontWeight: 'bold', display: 'flex', alignItems: "center" }} >
							Submit Bets
						</Button>

					</Box>
				}

				<Snackbar message="snackbar" />
			</Box>


			{
				bets.length > 0 &&

				<Box className="bet-slip-mobile" >
					<Box className="mobile-bet-slip-fab" onClick={() => setMobileOpen(true)} >
						<AddIcon />
						<Typography style={{ fontWeight: 'bold', fontSize: '20px' }} variant="body1">
							{bets.length} Betslip
						</Typography>
					</Box>

					<Backdrop open={mobileOpen} className="mobile-bet-slip-option-container">
						<Box className="mobile-bet-slip-open">
							<Box className="close-icon-container" onClick={() => setMobileOpen(false)} >
								<Typography variant="body1" style={{ fontWeight: 'bold', fontSize: "20px", color: '#bbb' }} >BETSLIP</Typography>
								<CloseIcon />
							</Box>

							<Box className={"mobile-bet-slip-open-main"} >
								{
									mobileBets.map(bet => <BetslipOption bet={bet} removeBet={removeBet} />)
								}
							</Box>

							<Box className={"mobile-bet-slip-open-actions"}>
								<Button fullWidth variant="outlined" onClick={handleMobileDeleteAll} style={{ border: '0.5px solid #ff3008', margin: '1em 0', color: "#ff3008", fontWeight: 'bold', display: 'flex', alignItems: "center" }} >
									<DeleteOutlinedIcon />
									Delete All
								</Button>
								<Button fullWidth variant="contained" onClick={deleteAllBets} style={{ fontWeight: 'bold', display: 'flex', alignItems: "center" }} >
									Submit Bets
								</Button>
							</Box>


						</Box>
					</Backdrop>

				</Box>
			}





		</Box>
	)
}

const BetslipOption = ({ bet, removeBet, isParlay }) => {

	// cant parse negative numbers for some reason???
	let priceFloat = 0
	if (bet.Price[0] == "+") {
		priceFloat = parseInt(bet.Price.substring(1, bet.Price.length))
	} else {
		priceFloat = parseInt(bet.Price.substring(1, bet.Price.length)) * -1
	}
	const decimalOdds = priceFloat > 0 ? 1 + (priceFloat / 100) : 1 - (100 / priceFloat)

	const [amount, setAmount] = useState(5)
	bet.Amount = amount
	const [toWinAmount, setToWinAmount] = useState((Math.floor(100 * amount * decimalOdds) / 100).toFixed(2))
	const [color, setColor] = useState("primary")

	const wagerChanged = e => {
		let amt = e.target.value
		const regex = /^(\d{0,5}\.\d{1,2}|\d{1,5})$/;
		if (amt === "" || regex.test(amt)) {
			if (amt > 50) {
				setColor("error")
				amt = 50
			} else {
				setColor("primary")
			}
			setAmount(amt);
			bet.Amount = amt
			setToWinAmount((Math.floor(100 * amt * decimalOdds) / 100).toFixed(2))
		}


	}



	return (
		<Box className="betslip-option" >

			<Box onClick={() => removeBet(bet.Index)} style={{ cursor: 'pointer' }} >
				<RemoveCircleOutlineIcon style={{ color: '#ff3008' }} />
			</Box>

			<Box className="betslip-option-container">
				<Box className="betslip-option-header">
					<Box className="betslip-option-header-left">
						<Box className="betslip-option-header-text">
							<Typography variant="body1" style={{ fontWeight: 'bold' }} >{bet.BetOnTeam}</Typography>
							<Typography variant="body2" style={{ color: '#aaa' }} >{bet.BetType.toUpperCase()}</Typography>
						</Box>
						<Typography variant="body2" style={{ fontSize: "12px" }} > {bet.AwayTeam} @ {bet.HomeTeam} </Typography>
					</Box>

					<Box className="betslip-option-header-right">
						<Typography variant="body1" style={{ fontWeight: 'bold' }} >{bet.Price}</Typography>
					</Box>

				</Box>

				<Box className="wager-win-amts">
					<FormControl fullWidth sx={{ mr: 1 }}>
						<InputLabel htmlFor="outlined-adornment-amount">Wager</InputLabel>
						<OutlinedInput
							id="outlined-adornment-amount"
							startAdornment={<InputAdornment position="start">$</InputAdornment>}
							label="Wager"
							pattern="[0-9]*"
							value={amount}
							placeholder={amount}
							color={color}
							onChange={wagerChanged}
							disabled={isParlay}
						/>
					</FormControl>
					<FormControl fullWidth sx={{ ml: 1 }}>
						<InputLabel htmlFor="outlined-adornment-amount">To Win</InputLabel>
						<OutlinedInput
							disabled
							id="outlined-adornment-amount"
							startAdornment={<InputAdornment position="start">$</InputAdornment>}
							label="To Win"
							value={toWinAmount}
						/>
					</FormControl>
				</Box>
			</Box>

		</Box>
	)
}

export default Betslip
