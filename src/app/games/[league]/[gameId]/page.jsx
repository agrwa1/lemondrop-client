'use client'

import React, { useState, useEffect } from 'react'

import Betslip from '../../../components/Betslip';
import GameCard from '../../../components/GameCard'

import axios from 'axios'
import moment from 'moment'

import Type1GamesHeader from '../../../components/Type1GamesHeader'

import { useParams } from 'next/navigation'

export default function Page() {
	const params = useParams()
	const gameId = params.gameId

	const [game, setGame] = useState({})
	const [loading, setLoading] = useState(false)
	const [leagueParsed, setLeagueParsed] = useState("")


	useEffect(() => {
		setLoading(true)
		const url = `https://lemondrop-api.onrender.com/api/games/game/${gameId}`
		axios.get(url).then(res => {
			setGame(res.data)
			setLeagueParsed(res.data.league)

		}).catch(e => console.log(e))
		setLoading(false)
	}, [])


	//! BUG: adding bet in prop page then going to league page then back to prop page will not register current bets

	return (
		<div className="grid grid-cols-12 mt-8 md:mt-0 ">
			<div className="col-span-12 md:col-span-8 ">
				<div className="bets-header">
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
								prop.stats.map(stat => <PropItem prop={stat} key={stat} />)
							}
						</MarketAccordion>)
				}


			</div>

			<div className="col-span-12 md:col-span-4 ">
				<Betslip />
			</div>
		</div>
	)
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

const PropItem = ({ prop }) => {
	if (prop.is_over_under) {
		return <OverUnderPropItem prop={prop} />
	}
	return <SinglePriceItem prop={prop} />
};

const SinglePriceItem = ({ prop }) => {
	const propName = prop.name
	const propPrice = prop.price
	const propPoint = prop.point

	return (
		<div className=" mb-2 grid grid-cols-8 gap-2 ">
			<div className="col-span-6 flex items-center  " >
				<p className="text-sm font-bold text-gray-400 ">{propName}</p>
			</div>

			<PropCell point={propPoint} price={propPrice} />
		</div>
	)
}

const OverUnderPropItem = ({ prop }) => {
	const propName = prop.name
	const propOverPoint = prop.over_point
	const propOverPrice = prop.over_price
	const propUnderPoint = prop.under_point
	const propUnderPrice = prop.under_price

	return (
		<div className=" mb-2 grid grid-cols-8 gap-2 ">
			<div className="col-span-4 flex items-center  " >
				<p className="text-sm font-bold text-gray-400">{propName}</p>
			</div>

			<PropCell point={propOverPoint} price={propOverPrice} />
			<PropCell point={propUnderPoint} price={propUnderPrice} />

		</div>
	)
}

const PropCell = ({ point, price }) => {

	if (point !== "") {
		return (
			<div className="col-span-2 border border-ldPurple rounded-lg py-1 flex justify-center items-center flex-col my-1 md:flex-row md:py-3 ">
				<p className="text-xs font-bold text-gray-300">{point}</p>
				<p className="text-xs text-gray-500 md:ml-2">{price}</p>
			</div>
		)
	}


	return (
		<div className="col-span-2 border border-ldPurple rounded-lg py-1 flex justify-center items-center flex-col my-1 md:flex-row md:py-3 ">
			<p className="text-xs text-gray-300 font-bold md:ml-2">{price}</p>
		</div>
	)
}