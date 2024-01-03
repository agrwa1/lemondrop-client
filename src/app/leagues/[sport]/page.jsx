'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import axios from 'axios'

export default function Page() {
	const sport = useParams()["sport"]
	const [leagues, setLeagues] = useState([])

	useEffect(() => {
		axios.get(`https://lemondrop-api.onrender.com/api/leagues/${sport}`).then(res => setLeagues(res.data))
	}, [])

	const convertSportName = l => {
		return toTitleCase(l.replace("_", " "))
	}

	function toTitleCase(str) {
		return str.replace(
			/\w\S*/g,
			function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
		);
	}

	return (
		<div className="">
			<div className="">
				<div className="p-2 mt-4 md:mt-0">
					<div>
						<h6 className="font-bold text-lg text-gray-300">{convertSportName(sport)} Leagues</h6>
					</div>

					<div>
						{leagues.map((l) => (
							<LeagueSelector league={l} key={l.id} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
const LeagueSelector = ({ league }) => {
	return (
		<Link href={`/games/${league.league_id}`} className=" ">
			<div className="px-4 py-4 my-3 bg-bgdGray">
				<p className="font-bold text-base text-white">{league.league_name}</p>
			</div>
		</Link>

	)
}

