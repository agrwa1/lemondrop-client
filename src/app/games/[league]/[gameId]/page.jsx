'use client'

import React, { useContext, useState, useEffect } from 'react'
import Betslip from '../../../components/Betslip';
import GameCard from '../../../components/GameCard'
import axios from 'axios'
import moment from 'moment'
import Type1GamesHeader from '../../../components/Type1GamesHeader'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Loading from './loading'

import LockIcon from '@mui/icons-material/Lock';

import { FaArrowLeft } from "react-icons/fa";
import { CounterContext } from '../../../context/bets.context'


export default function Page() {
	const { state, dispatch } = useContext(CounterContext)
	console.log(useContext(CounterContext))
	const params = useParams()
	const gameId = params.gameId

	const [game, setGame] = useState({})
	const [loading, setLoading] = useState(false)
	const [leagueParsed, setLeagueParsed] = useState("")
	const leagueId = params.league



	useEffect(() => {
		console.log(state)
		setLoading(true)
		const url = `https://lemondrop-api.onrender.com/api/games/game/${gameId}`
		axios.get(url).then(res => {
			setGame(res.data)
			setLeagueParsed(res.data.league)
		}).catch(e => console.log(e))
		setLoading(false)
	}, [])


	//! BUG: adding bet in prop page then going to league page then back to prop page will not register current bets
	if (Object.keys(game).length > 0) {
		return (
			<div className="grid grid-cols-12 mt-8 md:mt-0 gap-4">
				<div className="col-span-12 md:col-span-8 ">
					<div className="bets-header">
						{/* <Link className="flex items-center mb-2" href={`/games/${leagueId}`}>
							<FaArrowLeft className="text-gray-600 text-sm" />
							<p className="text-sm ml-1 text-gray-600 underline">	All {leagueParsed} Games</p>
						</Link> */}
						<p className="text-sm text-gray-500">{moment(game.start_date).format("LLLL")}</p>
						<h6 className="text-lg font-bold ">{`${game.away_team_name} @ ${game.home_team_name}`}</h6>
					</div>

					<div className="">
						<Type1GamesHeader leagueName={leagueParsed}
							sport={game.sport} />
						<GameCard game={game} raw={true} />
					</div>

					{
						game.props &&
						game.props.map(prop =>
							<MarketAccordion marketName={prop.name} key={prop.name} >
								{
									prop.stats.map(stat => <PropItem prop={stat} key={stat} marketName={prop.name} home={game.home_team_name} away={game.away_team_name} gameId={game.id} />)
								}
							</MarketAccordion>)
					}


				</div>

				<div className="col-span-12 md:col-span-4 ">
					<Betslip />
				</div>
			</div>
		)
	} else {
		<Loading />
	}

}




const MarketAccordion = ({ marketName, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOverUnder, setIsOverUnder] = useState(children[0].props.prop.is_over_under);

	useEffect(() => {
		setIsOverUnder(children[0].props.prop.is_over_under);
	}, [children])

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="px-2 border-y mb-2 border-gray-900 bg-bgdGray ">
			<div className="flex justify-between items-center py-4 cursor-pointer" onClick={toggleAccordion}>
				<p className="text-sm text-gray-300 font-semibold px-2 ">{marketName}</p>
				<svg
					className={`stroke-gray-500 w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
					fill="none"
					// stroke="ldPurple"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
				</svg>
			</div>
			{
				isOpen && isOverUnder && (
					<div className="grid grid-cols-8 py-2 " style={{ backgroundColor: "#181818" }}  >
						<div className="col-span-4 flex justify-start items-center " >
							<p className="text-gray-400 text-sm ml-2" >NAME</p>
						</div>
						<div className="col-span-2 flex justify-center items-center">
							<p className="text-gray-400 text-sm" >OVER</p>
						</div>
						<div className="col-span-2 flex justify-center items-center">
							<p className="text-gray-400 text-sm " >UNDER</p>
						</div>
					</div>
				)
			}

			{
				isOpen && !isOverUnder && (
					<div className="grid grid-cols-8 py-2 " style={{ backgroundColor: "#181818" }}  >
						<div className="col-span-6 flex justify-start items-center " >
							<p className="text-gray-400 text-sm ml-2" >NAME</p>
						</div>
						<div className="col-span-2 flex justify-center items-center">
							<p className="text-gray-400 text-sm " >ODDS</p>
						</div>
					</div>
				)
			}

			{isOpen && (
				<div className="px-2 py-1 ">
					{children}
				</div>
			)}
		</div>
	);
};

const PropItem = ({ prop, marketName, home, away, gameId }) => {
	const [active, setActive] = useState(false)
	const { state, dispatch } = useContext(CounterContext)
	const [overActive, setOverActive] = useState(false)
	const [underActive, setUnderActive] = useState(false)

	useEffect(() => {
		console.log(state.bets)
		console.log(prop)
		if (active) {
			setActive(false)
			setOverActive(false)
			setUnderActive(false)
		} state.bets.forEach(bet => {
			if (bet.gameId !== gameId) {
				return
			}
			if (bet.propName !== marketName) {
				return
			}
			if (bet.playerName !== prop.name) {
				return
			}
			if (bet.point == prop.point && prop.point) {
			} else if ((bet.point === prop.over_point && prop.over_point) || bet.betOnTeam.includes("Over")) {
				setOverActive(true)
			} else {
				setUnderActive(true)
			}
			setActive(true)
		})
	}, [state.bets])

	// marketName, prop.name == bet.
	if (prop.is_over_under) {
		return <OverUnderPropItem prop={prop} marketName={marketName} home={home} away={away} active={active} gameId={gameId} overActive={overActive} underActive={underActive} />
	}
	return <SinglePriceItem prop={prop} home={home} away={away} marketName={marketName} active={active} gameId={gameId} />
};

const SinglePriceItem = ({ prop, home, marketName, away, active, gameId }) => {
	const { state, dispatch } = useContext(CounterContext)
	const propName = prop.name
	const propPrice = prop.price
	const propPoint = prop.point

	const handleClick = () => {
		let betOnTeam = `${propName}`
		if (prop.point) {
			betOnTeam = `${propName} ${prop.point}`
		}

		// check if over or under
		return () => {
			const obj = {
				betOnTeam: betOnTeam,
				betType: "prop",
				homeTeam: home,
				awayTeam: away,

				gameId: gameId,
				playerName: propName,
				propName: marketName,
				point: prop.point,
				price: prop.price,
			}
			dispatch(obj)
		}

	}

	return (
		<div className=" mb-2 grid grid-cols-8 gap-2  ">
			<div className="col-span-6 flex items-center  " >
				<p className="text-sm font-bold text-gray-400 ">{propName}</p>
			</div>

			<PropCell point={propPoint} price={propPrice} dispatch={handleClick()} active={active} />
		</div>
	)
}

const OverUnderPropItem = ({ prop, marketName, home, away, active, gameId, overActive, underActive }) => {
	const { state, dispatch } = useContext(CounterContext)
	const propName = prop.name
	const propOverPoint = prop.over_point
	const propOverPrice = prop.over_price
	const propUnderPoint = prop.under_point
	const propUnderPrice = prop.under_price

	const handleClick = (overUnder) => {
		let betOnTeam = ""
		if (prop.over_point) {
			betOnTeam = `${propName} ${overUnder == "Over" ? propOverPoint : propUnderPoint}`
		} else if (propName) {
			betOnTeam = `${overUnder} ${propName}`
		} else if (!propName) {
			betOnTeam = `${propName} ${"Over" ? propOverPoint : propUnderPoint}`
		}

		// check if over or under
		return () => {
			const obj = {
				betOnTeam: betOnTeam,
				betType: "prop",
				homeTeam: home,
				awayTeam: away,

				playerName: propName,
				propName: marketName,
				point: overUnder == "Over" ? propOverPoint : propUnderPoint,
				price: overUnder == "Over" ? propOverPrice : propUnderPrice,
				gameId: gameId,
			}
			dispatch(obj)
		}

	}

	return (
		<div className=" mb-2 grid grid-cols-8 gap-2 ">
			<div className="col-span-4 flex items-center  " >
				<p className="text-sm font-bold text-gray-400">{propName}</p>
			</div>

			<PropCell className="cursor-pointer" point={propOverPoint} active={active && overActive} price={propOverPrice} dispatch={handleClick("Over")} />
			<PropCell point={propUnderPoint} price={propUnderPrice} active={active && underActive} dispatch={handleClick("Under")} />

		</div>
	)
}

const PropCell = ({ point, price, dispatch, active }) => {

	if (!price || price == "--") {
		return (
			<div className={`border-gray-700 col-span-2 border rounded-lg py-1 flex justify-center items-center flex-col my-1 md:flex-row md:py-3 `} >
				<LockIcon style={{ color: "#333" }} />
			</div>
		)
	}

	if (point !== "") {
		return (
			<div onClick={dispatch} className={`${active ? "bg-yellow border-yellow" : "border-ldPurple"} col-span-2 border rounded-lg py-1 flex justify-center items-center flex-col my-1 md:flex-row md:py-3 `}>
				<p className={` ${active ? " text-black" : "text-gray-300"} text-xs font-bold `}>{point}</p>
				<p className={` ${active ? "text-black  font-bold" : "text-gray-500"} text-xs md:ml-2`}>{price}</p>
			</div>
		)
	}

	return (
		<div onClick={dispatch} className={`${active ? "bg-yellow border-yellow" : "border-ldPurple"} col-span-2 border rounded-lg py-1 flex justify-center items-center flex-col my-1 md:flex-row md:py-3 `}>
			<p className={` ${active ? "text-black  font-bold" : "text-gray-300"} text-sm md:ml-2`}>{price}</p>
		</div>
	)
}