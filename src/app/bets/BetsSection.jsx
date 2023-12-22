'use client'
import React, { useEffect, useState } from 'react'

import getAuth from '../functions/getAuth'

import axios from 'axios'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';

import moment from 'moment'

export default function BetsSection() {
	const [user, setUser] = useState({})
	const [bets, setBets] = useState([])
	const [loading, setLoading] = useState(true)

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
			// <div className="text-center">
			// 	<div role="status">
			// 		<svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
			// 			<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
			// 			<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
			// 		</svg>
			// 		<span className="sr-only">Loading...</span>
			// 	</div>
			// </div>
			<div className="text-center" >
				<p className="text-xl text-gray-500">Loading...</p>
			</div>
		);
	} else {
		return (
			<div className="dashboard-bets-section">
				{bets.map((bet) => (bet.is_parlay ? <Parlay parlay={bet} key={bet} /> : <Bet bet={bet} key={bet} />))}
				{bets.length === 0 && (
					<div className="text-center mt-4" >
						<p className="text-xl text-gray-500">No Bets Here Yet! Place Some Bets and See Them Here.</p>
					</div>
				)}
			</div>
		);
	}
}

const Parlay = ({ parlay }) => {
	const [open, setOpen] = useState(true)

	// console.log(parlay)
	const price = parlay.bet_price.charAt(0) == "+" ? parseFloat(parlay.bet_price.substring(1)) : parseFloat(-1 * parlay.bet_price.substring(1))
	const decimalOdds = price > 0 ? 1 + (price / 100) : 1 - (100 / price)
	const toWinAmount = (Math.floor(100 * parseFloat(parlay.bet_amount) * decimalOdds) / 100).toFixed(2)

	return (
		<div className="mt-4 bg-gray-900 w-full">
			<div className="flex items-start w-full  px-4 py-8" >
				<StatusIcon status={parlay.bet_status} />

				<div onClick={() => setOpen(!open)} className="px-4 w-full">
					<div className="w-full">

						<div className="flex justify-between items-start w-full">
							<p className="font-bold text-lg text-white">
								{parlay.bets.length}-LEG PARLAY
							</p>

							<div className="flex items-center">
								<p className="font-bold text-lg text-gray-200">
									{parlay.bet_price}
								</p>

								{open ? (
									<button
										onClick={() => setOpen(false)}
										className="text-2xl ml-2 text-gray-300"
									>
										&#8593;
									</button>
								) : (
									<button
										onClick={() => setOpen(true)}
										className="text-2xl ml-2 text-gray-300"
									>
										&#8595;
									</button>
								)}
							</div>
						</div>



						<div className="col-span-12">
							<div className="w-full">
								{open && parlay.bets.map((b) => <ParlaySubBet bet={b} key={b.home_team} />)}
							</div>
						</div>

					</div>
				</div>
			</div>


			<div className="bg-gray-800 px-4 py-2 rounded-lg" >
				<div className="flex w-full justify-between">
					<p className="font-bold text-white text-lg">${parlay.bet_amount}</p>
					<p className="font-bold text-white text-lg">${toWinAmount}</p>
				</div>

				<div className="flex w-full justify-between">
					<p className="text-gray-500 text-md">TOTAL WAGER</p>
					<p className="text-gray-500 text-md">TOTAL PAYOUT</p>
				</div>
			</div>
		</div>
	)
}

const ParlaySubBet = ({ bet }) => {
	const toTitleCase = str => {
		return str.toUpperCase()
	}

	const price = bet.bet_price.charAt(0) == "+" ? parseFloat(bet.bet_price.substring(1)) : parseFloat(-1 * bet.bet_price.substring(1))
	const decimalOdds = price > 0 ? 1 + (price / 100) : 1 - (100 / price)
	const startTime = moment(bet.bet_placed_time).calendar()

	return (
		<div className="flex items-start mt-4" key={`${bet.away_team} ${bet.home_team} ${bet.bet_point} ${bet.bet_price}`}>

			<StatusIcon status={bet.bet_status} />

			<div className="bets-section-bet-header">
				<div className="grid grid-cols-12">
					<div className="col-span-12">
						<div className="bets-bet-name-container">
							<p className="font-bold text-base text-white">{toTitleCase(bet.bet_on_team)}</p>
						</div>
					</div>

					<div className="col-span-12 mb-2">
						<div className="bets-bet-name-container">
							<p className="text-base text-gray-600">{startTime}</p>
						</div>
					</div>

					<div className="col-span-12">
						<div className="flex justify-between items-center">
							<p className="text-sm uppercase text-gray-500">{bet.away_team} @ {bet.home_team}</p>
							<p className="font-bold text-base text-gray-700">{bet.bet_price}</p>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

const Bet = ({ bet }) => {
	const price = bet.bet_price.charAt(0) == "+" ? parseFloat(bet.bet_price.substring(1)) : parseFloat(-1 * bet.bet_price.substring(1))
	const decimalOdds = price > 0 ? 1 + (price / 100) : 1 - (100 / price)
	const toWinAmount = (Math.floor(100 * parseFloat(bet.bet_amount) * decimalOdds) / 100).toFixed(2)
	const startTime = moment(bet.bet_placed_time).calendar()

	return (
		<div className="flex flex-col bg-gray-900 my-8 rounded-lg " key={`${bet.away_team} ${bet.home_team} ${bet.bet_point} ${bet.bet_price}`}>
			<div className="flex items-start p-4" >

				<StatusIcon status={bet.bet_status} />

				<div className="px-4 w-full">

					<div className="flex flex-col w-full">
						<div className="flex w-full justify-between">
							<p className=" font-bold text-white text-lg">{bet.bet_on_team}</p>

							{/* <p className="font-bold text-white text-lg">{toTitleCase(bet.bet_on_team)}</p> */}
							<p className="font-bold text-lg text-gray-200">{bet.bet_price}</p>
						</div>
						<div className="flex w-full justify-between">
							<p className="text-md text-gray-700">{startTime}</p>
						</div>

					</div>

					<div className="my-4">
						<p className="text-lg text-gray-600">{bet.away_team} @ {bet.home_team}</p>
					</div>
				</div>
			</div>

			<div className="bg-gray-800 px-4 py-2 rounded-lg" >
				<div className="flex w-full justify-between">
					<p className="font-bold text-white text-lg">${bet.bet_amount}</p>
					<p className="font-bold text-white text-lg">${toWinAmount}</p>
				</div>

				<div className="flex w-full justify-between">
					<p className="text-gray-500 text-md">TOTAL WAGER</p>
					<p className="text-gray-500 text-md">TOTAL PAYOUT</p>
				</div>
			</div>


		</div >
	)
}


const StatusIcon = ({ status }) => {
	return (
		<div className="flex items-center">

			{status === "Pending" && (
				<PendingIcon className="text-yellow-500" style={{ marginTop: '.2em' }} />
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