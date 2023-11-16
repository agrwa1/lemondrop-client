import React, { useState, useEffect } from 'react'

import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Box, Button, Input, InputLabel, TextField, FormControl, Snackbar, CircularProgress } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OutlinedInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';

import moment from 'moment'
import { useAuth } from '../App'

import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Betslip from '../components/Betslip'
import GameCard from '../games/GameCard'


// add loading indicator
const Bets = () => {
	const [game, setGame] = useState({})
	const [bets, setBets] = useState([])
	const [gameId, setGameId] = useState(window.location.pathname.split('/')[2])
	const navigate = useNavigate()
	const [markets, setMarkets] = useState([])
	const [subMarkets, setSubMarkets] = useState([])
	const [activeMarketIndex, setActiveMarketIndex] = useState(0)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)



	/*
		bets;
			{
				betId: {
					Bet name: team || team + spread || total
					bet type: 	ml || spread || total || submarket name
					Odds: +-
					Date: game commence time
					Game: away @ home
					Wager: amt in betslip
					to win: amt in betslip
				}
			}
	*/

	const addBet = (betOnTeam, betType, price, point, awayTeam, homeTeam, gameId) => {
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

	// get game
	useEffect(() => {
		// setLoading(true)
		// const url = `https://lemondrop-api.onrender.com/api/games/game/${gameId}`
		// axios.get(url).then(res => {
		// 	setGame(res.data)
		// }).catch(e => { navigate("/404") })
		// setLoading(false)
	}, [])


	// get markets
	useEffect(() => {
		const marketsUrl = `https://lemondrop-api.onrender.com/api/markets/${game.sport_key}`
		axios.get(marketsUrl).then(res => {
			setMarkets(res.data)
			setSubMarkets(res.data[0].all_markets)
		})
	}, [game])



	return (
		<Grid container className="bets-container" >
			<Grid item container xs={12}>
				<Box sx={{ height: '2em' }} />
			</Grid>

			<Grid item xs={12} md={8} className="bets-main" >
				<Box className={"bets-header"}>
					<Typography variant="body1" style={{ color: "#aaa", fontSize: '14px' }} >{moment(game.commence_time).format("LLLL")} </Typography>
					<Typography variant="h6" style={{ fontSize: "20px" }} >{game.away_team + " @ " + game.home_team} </Typography>
				</Box>

				<Box className={"main-game-props"}>
					<MainLineHeader />
					<GameCard game={game} raw={true} bets={bets} addBet={addBet} removeBet={removeBet} />
				</Box>

				{
					loading &&
					<CircularProgress />
				}

				{
					bets &&
					<Box className="market-picker">
						{
							markets.map((m, index) => <MarketPickerOption key={index} marketName={m.name} setActiveMarketIndex={setActiveMarketIndex} activeMarketIndex={activeMarketIndex} index={index} submarkets={m.all_markets} setSubMarkets={setSubMarkets} />)
						}
					</Box>
				}

				{
					subMarkets &&
					<Box className="submarkets">
						{
							subMarkets.map(s => <SubmarketOption key={s} submarket={s} game={game} addBet={addBet} removeBet={removeBet} bets={bets} />)
						}
					</Box>
				}

			</Grid>

			<Grid item xs={12} md={4} className="bet-slip-container" >
				<Betslip bets={bets} removeBet={removeBet} setBets={setBets} setSuccess={setSuccess} />
			</Grid>

			<Snackbar open={success} message="Bets Successfully Placed!" onClose={() => setSuccess(false)} autoHideDuration={6000} />

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

const SubmarketOption = ({ submarket, game, addBet, removeBet, bets }) => {
	const league = game.sport_key
	const gameId = game.id
	const name = submarket.split("_").map(word => submarketLookup(word[0].toUpperCase() + word.slice(1))).join(" ")
	const [open, setOpen] = useState(false)
	const [outcomes, setOutcomes] = useState([])
	const [loading, setLoading] = useState(false)

	const [alreadyOpened, setAlreadyOpened] = useState(false)

	// if open: send get request
	// else dont
	useEffect(() => {
		if (open) {
			setLoading(true)
			const url = `https://lemondrop-api.onrender.com/api/games/league/${league}/game/${gameId}/props/${submarket}`
			axios.get(url).then(res => {
				setOutcomes([...res.data.outcomes])
			})
		}
		setLoading(false)
		setAlreadyOpened(true)

	}, [open])

	return (
		<Box>
			<Accordion className="submarket-accordion"  >
				<AccordionSummary onClick={() => setOpen(!open)}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography style={{ fontWeight: 'bold' }} >{name}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{
						loading && <CircularProgress />
					}
					<Grid container spacing={0}>
						{
							outcomes.map(outcome => <OutcomeOption submarketName={name} key={`${outcome.name} ${outcome.point} ${outcome.description}`} addBet={addBet} removeBet={removeBet} bets={bets} outcome={outcome} game={game} />)
						}
					</Grid>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}

const OutcomeOption = ({ outcome, bets, addBet, removeBet, game, submarketName }) => {
	const description = outcome.description
	let point = outcome.point > 0 ? `+${outcome.point}` : outcome.point
	if (point == 0) {
		point = 'ML'
	}
	const betOnTeamStr = `${outcome.description} ${outcome.name} ${outcome.point}`

	const price = outcome.price > 0 ? `+${outcome.price}` : outcome.price

	const [active, setActive] = useState(false)
	// can store index and search around index for faster search

	const handleClick = () => {
		if (!active) {
			addBet(betOnTeamStr, submarketName, outcome.price, outcome.point, game.away_team, game.home_team, game.id)
		}

		else {
			bets.forEach(bet => {
				if (bet.BetOnTeam == betOnTeamStr && bet.BetType.toLowerCase() == submarketName) {
					removeBet(bet.Index)
				}
			})
		}
		setActive(!active)
	}

	useEffect(() => {
		// find way to remove if not in bets list
		// if betonteam != cur bet on team for every team then not active else active
		if (bets.every(bet => { return (bet.BetOnTeam != betOnTeamStr && bet.BetType.toLowerCase() != submarketName) })) {
			setActive(false)
		} else {
			setActive(true)
		}


	}, [bets, game])


	return (
		<Grid item className={`bets-outcome-option ${active ? 'bets-outcome-option-active' : ""} `} xs={12} sm={6} md={6} lg={4} onClick={handleClick} >
			<Typography variant="body2">
				<Typography variant="body2" style={{ fontWeight: 'bold', color: "#ddd" }} className={`${active ? "bets-outcome-option-text-active" : ""}`} >{description} {outcome.name} </Typography>
				<Typography variant="body2" style={{ color: '#bbb' }} className={`${active ? "bets-outcome-option-text-active" : ""}`} >{point} </Typography>
			</Typography>
			<Typography variant="body2">
				<Typography variant="body2" style={{ fontWeight: 'bold' }} >{price} </Typography>
			</Typography>
		</Grid>
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
