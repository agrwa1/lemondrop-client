import React, { useState, useEffect } from 'react'

import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Box, Button, Input, InputLabel, TextField, FormControl, Snackbar } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OutlinedInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';

import moment from 'moment'
import { useAuth } from '../App'

import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Betslip from '../components/Betslip'
import GameCard from '../games/GameCard'

const Bets = () => {
	const [game, setGame] = useState({})
	const [bets, setBets] = useState([])
	const [submit, setSubmit] = useState(false)
	const [gameId, setGameId] = useState(window.location.pathname.split('/')[2])
	const navigate = useNavigate()
	const [markets, setMarkets] = useState([])
	const [subMarkets, setSubMarkets] = useState([])
	const [activeMarketIndex, setActiveMarketIndex] = useState(0)

	// get game
	useEffect(() => {
		const url = `https://lemondrop-api.onrender.com/api/games/game/${gameId}`
		axios.get(url).then(res => {
			setGame(res.data)
		}).catch(e => { navigate("/404") })
	}, [])

	// get markets
	useEffect(() => {
		const marketsUrl = `https://lemondrop-api.onrender.com/api/markets/${game.sport_key}`
		console.log(marketsUrl)
		axios.get(marketsUrl).then(res => {
			console.log(res.data)
			setMarkets(res.data)
			setSubMarkets(res.data[0].all_markets)
		})
	}, [game])



	return (
		<Grid container className="bets-container" >
			<Grid item container xs={12}>
				<Box sx={{ height: '2em' }} />
			</Grid>

			<Grid item container xs={12} md={8} className="bets-main" >
				<Box className={"bets-header"}>
					<Typography variant="body1" style={{ color: "#aaa", fontSize: '14px' }} >{moment(game.commence_time).format("LLLL")} </Typography>
					<Typography variant="h6" style={{ fontSize: "20px" }} >{game.away_team + " @ " + game.home_team} </Typography>
				</Box>

				<Box className={"main-game-props"}>
					<MainLineHeader />
					<GameCard game={game} raw={true} />
				</Box>

				{
					bets &&
					<Box className="market-picker">
						{
							markets.map((m, index) => <MarketPickerOption marketName={m.name} setActiveMarketIndex={setActiveMarketIndex} activeMarketIndex={activeMarketIndex} index={index} submarkets={m.all_markets} setSubMarkets={setSubMarkets} />)
						}
					</Box>
				}

				{
					subMarkets &&
					<Box className="submarkets">
						{
							subMarkets.map(s => <SubmarketOption submarket={s} />)
						}
					</Box>
				}

			</Grid>

			<Grid item xs={12} md={4}>
				<Betslip bets={[]} />
			</Grid>
		</Grid>
	)
}

const MainLineHeader = () => {
	return (
		<Grid item xs={12} container className="main-bets-header main-header" style={{ margin: '1em 0' }} >
			<Grid item xs={6} className="games-header-name bets-game-header-name"  >
				<Typography variant="body2" style={{ fontSize: '14px', color: "#aaa" }} >MAIN LINE</Typography>
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

const submarketLookup = input => {
	const map = {
		"Tds": "Touchdowns",
		"Td": "Touchdown",

		"Yds": "Yards",
		"Yd": "Yard",

		"H2h": "Moneyline",

		"P1": "First Period",
		"P2": "Second Period",
		"P3": "Third Period",

		"Q1": "First Quarter",
		"Q2": "Second Quarter",
		"Q3": "Third Quarter",
		"Q4": "Fourth Quarter",

		"H1": "First Half",
		"H2": "Second Half"
	}

	if (input in map) {
		return map[input]
	}

	return input
}

const SubmarketOption = ({ submarket }) => {
	const name = submarket.split("_").map(word => submarketLookup(word[0].toUpperCase() + word.slice(1))).join(" ")

	return (
		<Box>
			<Accordion className="submarket-accordion" >
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography style={{ fontWeight: 'bold' }} >{name}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography  >
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}

const MarketPickerOption = ({ marketName, submarkets, setSubMarkets, index, activeMarketIndex, setActiveMarketIndex }) => {

	const handleClick = () => {
		setSubMarkets(submarkets);
		setActiveMarketIndex(index)
	}

	return (
		<Box className={`market-option ${activeMarketIndex == index ? "market-option-active" : ''}`} onClick={handleClick} >
			<span className={`market-option-text ${activeMarketIndex == index ? "market-option-text-active" : ''} `}>{marketName}</span>
		</Box>
	)
}

export default Bets














































// // const addBet = (team, point, price) => {
// // 	setBets([{ team, point, price }, ...bets])
// // }

// // const removeBet = (team, point, price) => {
// // 	const validBets = []
// // 	for (let i = 0; i < bets.length; i++) {
// // 		if (bets[i].team === team && Math.abs(bets[i].price) === Math.abs(price)) {
// // 			continue
// // 		} else {
// // 			validBets.push(bets[i])
// // 		}
// // 	}
// // 	setBets(validBets)
// // }

// // const submitBets = () => {
// // 	setSubmit(true)
// // }


// const BetOption = ({ point, price, addBet, removeBet, team }) => {

// 	const [active, setActive] = useState(false)
// 	// const [added, setAdded] = useState(false)
// 	// const [disabled, setDisabled] = useState((point == 0 || price == 0 || point == "-") ? true : false)
// 	// const [newPoint, setNewPoint] = useState(point)
// 	// const [newPrice, setNewPrice] = useState(price)



// 	// useEffect(() => {
// 	// 	if (point == 0) {
// 	// 		setNewPoint("-")
// 	// 		setNewPrice("")
// 	// 		setDisabled(true)
// 	// 	}
// 	// 	if (disabled) {
// 	// 		return
// 	// 	}
// 	// 	if (active && !added) {
// 	// 		// MLINE
// 	// 		if (!price) {
// 	// 			if (point > 0) {
// 	// 				addBet(team, "ML", `+${point}`)
// 	// 				setAdded(true)
// 	// 			}
// 	// 			else {
// 	// 				addBet(team, "ML", point)
// 	// 				setAdded(true)
// 	// 			}
// 	// 		}

// 	// 		// TOTALS
// 	// 		else if (team == "Over" || team == "Under") {
// 	// 			addBet(team, point, price)
// 	// 			setAdded(true)
// 	// 		}

// 	// 		// SPREAD
// 	// 		else {
// 	// 			// SPREAD
// 	// 			if (point > 0) {
// 	// 				point = `+${point}`
// 	// 			}
// 	// 			setAdded(true)
// 	// 			addBet(team, point, price)
// 	// 		}

// 	// 	} else {
// 	// 		if (!price) {
// 	// 			removeBet(team, "ML", point)
// 	// 			setAdded(false)
// 	// 		} else {
// 	// 			removeBet(team, point, price)
// 	// 			setAdded(false)
// 	// 		}
// 	// 	}
// 	// }, [active, disabled, newPoint, newPrice])

// 	// const activate = () => {
// 	// 	if (!disabled) { setActive(true) }
// 	// }

// 	return (
// 		// <Grid item xs={4} sm={4} md={5}  >
// 		// 	<Box sx={{ border: '1px solid lightgray' }} className={active ? "bet-box-active" : "bet-box-inactive"} onClick={activate} >
// 		// 		<Typography textAlign="center" sx={{ fontWeight: 'bold' }} variant="h6">{newPoint > 0 ? `+${newPoint}` : newPoint} </Typography>
// 		// 		<Typography textAlign="center" variant="body1" sx={{ color: 'gray' }}>{newPrice > 0 ? `+${newPrice}` : newPrice} </Typography>
// 		// 	</Box>
// 		// </Grid>
// 		<Grid item xs={4} sm={4} md={5}  >
// 			<Box sx={{ border: '1px solid lightgray' }} className={active ? "bet-box-active" : "bet-box-inactive"} >
// 				<Typography textAlign="center" sx={{ fontWeight: 'bold' }} variant="h6">{point > 0 ? `+${point}` : point} </Typography>
// 				<Typography textAlign="center" variant="body1" sx={{ color: 'gray' }}>{price > 0 ? `+${price}` : price} </Typography>
// 			</Box>
// 		</Grid>
// 	)
// }

// const BetSeparator = ({ type }) => {
// 	return (
// 		<Grid item xs={4} sm={4} md={2}  >
// 			<Typography textAlign="center" variant="h5" sx={{ color: 'gray' }} >{type}</Typography>
// 		</Grid>
// 	)
// }

// const BetSlipOption = ({ team, point, price, submit, game, gameId }) => {
// 	const { user } = useAuth()
// 	const [amount, setAmount] = useState(10)

// 	const submitBet = () => {
// 		console.log("submitting bet with team: " + team)
// 		axios.post("https://lemondrop-api.onrender.com/api/bets/add", {
// 			user_id: user.user_id,
// 			"user_email": user.email,
// 			"user_balance": user.current_balance,
// 			"user_availability": user.current_availability,
// 			"user_pending": user.current_pending,
// 			"user_free_play": user.current_free_play,

// 			"game_id": gameId,
// 			"home_team": game.home_team,
// 			"away_team": game.away_team,
// 			"game_start_time": game.commence_time,

// 			"bet_type": team == "Over" || team == "Under" ? "Totals" : point == "ML" ? "Moneyline" : "Spread",
// 			"bet_on_team": team,
// 			"bet_point": point,
// 			"bet_price": price,
// 			"bet_amount": amount,
// 		})
// 	}

// 	useEffect(() => {
// 		if (submit) {
// 			submitBet()
// 		}
// 	}, [submit])

// 	return (
// 		<Box sx={{ marginBottom: '2em', marginTop: '1em' }} >
// 			<Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }} >
// 				<Typography sx={{ fontWeight: "bold" }} variant='body1'>{team}</Typography>
// 				<Typography sx={{ fontWeight: "bold" }} variant='body2'>{point}</Typography>
// 				<Typography sx={{ fontWeight: "bold" }} variant='body2'>{price}</Typography>
// 			</Box>


// 			<Box>

// 				<FormControl fullWidth sx={{ m: 1 }}>
// 					<Input
// 						d startAdornment={<InputAdornment position="start">$</InputAdornment>}
// 						label="Amount"
// 						onChange={e => setAmount(e.target.value)}
// 						placeholder={amount}
// 					/>
// 				</FormControl>
// 			</Box>



// 		</Box>
// 	)
// }



// export default Bets
