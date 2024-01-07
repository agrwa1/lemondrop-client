'use client'
import React, { useEffect, useState } from 'react'

import getAuth from '../functions/getAuth'

import axios from 'axios'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';

import { FaAngleUp, FaAngleDown } from "react-icons/fa6";


import moment from 'moment'

export default function BetsSection() {
	const [user, setUser] = useState({})
	const [bets, setBets] = useState([])
	const [loading, setLoading] = useState(true)
	const [pendingBets, setPendingBets] = useState([])
	const [settledBets, setSettledBets] = useState([])
	const [currentShownBets, setCurrentShownBets] = useState("Pending")

	useEffect(() => {
		const pending = []
		const settled = []

		bets.forEach(bet => {
			if (bet.bet_status == "Pending") {
				pending.push(bet)
			} else {
				settled.push(bet)
			}
		})

		setPendingBets(pending)
		setSettledBets(settled)

	}, [bets])


	useEffect(() => {
		getAuth().then(u => setUser(u))
		setLoading(false)
	}, [])


	useEffect(() => {
		if (!user.user_id) {
			return
		}
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
			<div className="text-center mt-8" >
				<p className="text-xl text-gray-500">Loading...</p>
			</div>
		);
	}
	else {
		return (
			<div className="">

				<div className="w-full flex border-b border-white items-center pb-2 mt-8">
					<p onClick={() => setCurrentShownBets("Pending")} className={`text-xl pr-4 ${currentShownBets == "Pending" ? "text-gray-200 font-bold" : "text-gray-500"}`} >
						Pending
					</p>
					<p onClick={() => setCurrentShownBets("Settled")} className={`text-xl pr-4 ${currentShownBets == "Settled" ? "text-gray-200 font-bold" : "text-gray-500"}`} >
						Settled
					</p>
					<p onClick={() => setCurrentShownBets("All Bets")} className={`text-xl pr-4 ${currentShownBets == "All Bets" ? "text-gray-200 font-bold" : "text-gray-500"}`} >
						All Bets
					</p>


				</div>

				{
					currentShownBets == "Pending" && <BetDividedSection bets={pendingBets} />}

				{
					currentShownBets == "Settled" && <BetDividedSection bets={settledBets} />
				}

				{
					currentShownBets == "All Bets" && <BetDividedSection bets={bets} />
				}


			</div>
		);
	}
}


const BetDividedSection = ({ bets }) => {
	return (
		<div>
			{
				bets.map((bet) => (bet.is_parlay ? <Parlay parlay={bet} key={bet} /> : <Bet bet={bet} key={bet} />))
			}

			{bets.length === 0 && (
				<div className="text-center mt-4 mb-12" >
					<p className="text-xl text-gray-500">No Bets Here Yet! Place Some Bets and See Them Here.</p>
				</div>
			)}

		</div>
	)
}


const Parlay = ({ parlay }) => {
	const [open, setOpen] = useState(false)

	console.log(parlay)
	const bets = parlay.selections

	let parlayOdds = 1;
	bets.forEach(betData => {
		const price = betData.odds.charAt(0) == '+' ? parseFloat(betData.odds.substring(1)) : parseFloat(-1 * betData.odds.substring(1));
		const decimalOdds = price > 0 ? 1 + (price / 100) : 1 - (100 / price);
		parlayOdds *= decimalOdds;
	});
	const toWinAmount = (Math.floor(100 * parseFloat(parlay.bet_amount) * parlayOdds) / 100).toFixed(2);
	const startTime = moment(parlay.placed_at).calendar();
	const odds = parlayOdds >= 2 ? `+${Math.round((parlayOdds - 1) * 100)}` : `-${Math.round(100 / (parlayOdds - 1))}`;

	const betOnValues = bets.map(bet => bet.bet_on).join(', ');

	return (
		<div className="flex mt-4 mb-12 w-full flex-col" >
			<div className=" w-full flex justify-between items-center" >
				<p className="font-bold text-md text-yellow" >
					{bets.length} LEG PARLAY
				</p>
				<p className="font-bold text-md">
					{odds}
				</p>
			</div>

			<div className="mt-2  border-gray-700 pb-2 flex justify-between items-start" onClick={() => setOpen(!open)} >
				<p className=" text-sm text-gray-400"  >{betOnValues}</p>

				<p className="px-1 pt-1" >
					{
						open ? <FaAngleDown /> : <FaAngleUp />
					}
				</p>
			</div>


			{
				open &&
				bets.map(bet => <ParlaySubBet bet={bet} key={bet} />)
			}

			<p className="mt-3 font-bold text-xs text-gray-500" >
				Placed {startTime}
			</p>
			<div className="flex justify-between items-center mt-1">
				<p className="text-sm font-bold text-gray-600">
					Bet ${parlay.bet_amount} To Win: ${toWinAmount}
				</p>

				<p className="text-sm font-bold text-gray-600">
					{parlay.bet_status}
				</p>
			</div>
		</div>
	)



	// const [open, setOpen] = useState(true)

	// // console.log(parlay)
	// const price = parlay.bet_price.charAt(0) == "+" ? parseFloat(parlay.bet_price.substring(1)) : parseFloat(-1 * parlay.bet_price.substring(1))
	// const decimalOdds = price > 0 ? 1 + (price / 100) : 1 - (100 / price)
	// const toWinAmount = (Math.floor(100 * parseFloat(parlay.bet_amount) * decimalOdds) / 100).toFixed(2)

	// return (
	// 	<div className="mt-4 bg-gray-900 w-full">
	// 		<div className="flex items-start w-full  px-4 py-8" >
	// 			<StatusIcon status={parlay.bet_status} />

	// 			<div onClick={() => setOpen(!open)} className="px-4 w-full">
	// 				<div className="w-full">

	// 					<div className="flex justify-between items-start w-full">
	// 						<p className="font-bold text-lg text-white">
	// 							{parlay.bets.length}-LEG PARLAY
	// 						</p>

	// 						<div className="flex items-center">
	// 							<p className="font-bold text-lg text-gray-200">
	// 								{parlay.bet_price}
	// 							</p>

	// 							{open ? (
	// 								<button
	// 									onClick={() => setOpen(false)}
	// 									className="text-2xl ml-2 text-gray-300"
	// 								>
	// 									&#8593;
	// 								</button>
	// 							) : (
	// 								<button
	// 									onClick={() => setOpen(true)}
	// 									className="text-2xl ml-2 text-gray-300"
	// 								>
	// 									&#8595;
	// 								</button>
	// 							)}
	// 						</div>
	// 					</div>



	// 					<div className="col-span-12">
	// 						<div className="w-full">
	// 							{open && parlay.bets.map((b) => <ParlaySubBet bet={b} key={b.home_team} />)}
	// 						</div>
	// 					</div>

	// 				</div>
	// 			</div>
	// 		</div>


	// 		<div className="bg-gray-800 px-4 py-2 rounded-lg" >
	// 			<div className="flex w-full justify-between">
	// 				<p className="font-bold text-white text-lg">${parlay.bet_amount}</p>
	// 				<p className="font-bold text-white text-lg">${toWinAmount}</p>
	// 			</div>

	// 			<div className="flex w-full justify-between">
	// 				<p className="text-gray-500 text-md">TOTAL WAGER</p>
	// 				<p className="text-gray-500 text-md">TOTAL PAYOUT</p>
	// 			</div>
	// 		</div>
	// 	</div>
	// )
}

const ParlaySubBet = ({ bet }) => {
	const toTitleCase = str => {
		return str.toUpperCase()
	}

	// const price = bet.bet_price.charAt(0) == "+" ? parseFloat(bet.bet_price.substring(1)) : parseFloat(-1 * bet.bet_price.substring(1))
	// const decimalOdds = price > 0 ? 1 + (price / 100) : 1 - (100 / price)
	// const startTime = moment(bet.bet_placed_time).calendar()

	return (
		<div className="flex my-3 pl-1 w-full justify-between" >
			<div className="w-full" >
				<div className="flex justify-between items-center" >
					<p className="font-bold text-sm text-gray-400" >
						{bet.bet_on.toUpperCase()}
					</p>

					<p className={"font-bold text-sm text-gray-500"} >
						{bet.odds}
					</p>
				</div>


				<p className="font-bold text-xs  text-gray-600" >
					{bet.bet_type.toUpperCase()}
				</p>

				<p className="mt-2 font-bold text-xs text-gray-500" >
					{bet.away_team_name} @ {bet.home_team_name}
				</p>

			</div>

		</div>
	)
}

const Bet = ({ bet }) => {
	const betData = bet.selections[0]
	const price = betData.odds.charAt(0) == "+" ? parseFloat(betData.odds.substring(1)) : parseFloat(-1 * betData.odds.substring(1))
	const decimalOdds = price > 0 ? 1 + (price / 100) : 1 - (100 / price)
	const toWinAmount = (Math.floor(100 * parseFloat(bet.bet_amount) * decimalOdds) / 100).toFixed(2)
	const startTime = moment(bet.placed_at).calendar()


	return (
		<div className="flex mt-4 mb-12 w-full justify-between" >
			<div className="w-full" >
				<div className="flex justify-between items-center" >
					<p className="font-bold text-md text-yellow" >
						{betData.bet_on.toUpperCase()}
					</p>

					<p className={"font-bold text-md"} >
						{betData.odds}
					</p>
				</div>


				<p className="font-bold text-sm  text-gray-600" >
					{betData.bet_type.toUpperCase()}
				</p>

				<p className="mt-2 font-bold text-sm text-gray-400" >
					{betData.away_team_name} @ {betData.home_team_name}
				</p>

				<p className="mt-1 font-bold text-xs text-gray-500" >
					Placed {startTime}
				</p>

				<div className="flex justify-between items-center mt-3">
					<p className="text-sm font-bold text-gray-600">
						Bet ${bet.bet_amount} To Win: ${toWinAmount}
					</p>

					<p className="text-sm font-bold text-gray-600">
						{bet.bet_status}
					</p>
				</div>
			</div>



			<div>
			</div>
		</div>
	)

}


const StatusIcon = ({ status }) => {
	return (
		<div className="flex items-center">

			{status === "Pending" && (
				<PendingIcon className=" text-yellow" style={{ marginTop: '.2em' }} />
			)}

			{status === "Won" && (
				<CheckCircleIcon className="text-green-500" style={{ marginTop: '.2em' }} />
			)}

			{status === "Lost" && (
				<CancelIcon className="text-red-500" style={{ marginTop: '.2em' }} />
			)}

		</div>

	)
}