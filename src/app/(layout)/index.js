/* eslint-disable react/prop-types */

import Footer from '../components/Footer';
import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';

async function getData() {
	let res = await fetch(
		'https://lemondrop-api.onrender.com/api/leagues/all',
		{ cache: 'force-cache' }
		// 'http://localhost:8080/api/leagues/all',
		// { cache: 'no-store' }
	);
	let body = await res.json();
	// console.log(body);
	return {
		Popular: body['Popular'],
		Sports: body['Sports'],
		'All Leagues': body['All Leagues'],
	};
	// return body;
}

/*
	- Popular
		- nba, nfl, nhl
	
	- Sports
		- Basketball, Football, Hockey, Soccer
	
	- All Leagues
		- ...
*/

function LeagueOrSport({ league, data }) {
	if (!data) return <div></div>;

	const isLeague = data[0].league_name !== undefined;

	const leagueLink = {
		name: league,
		endpoint:
			league == 'All Leagues'
				? '/leagues/all'
				: league == 'Popular'
				? '/leagues/popular'
				: '/sports',
	};

	const links = data.map((raw) => ({
		name: isLeague ? raw.league_name : raw.name,
		photoUrl: raw.url,
		endpoint: isLeague
			? `/games/${raw.league_id}`
			: `/leagues/${raw.sport_id}`,
	}));

	// show non-all leagues links on mobile
	return (
		<div
			className={`md:mb-4 mt-4 md:flex-col ${
				league == 'All Leagues' ? 'hidden md:flex' : 'flex'
			} `}
		>
			<h3 className='h-full hidden md:flex  text-lg font-bold mb-0'>
				<SidebarLink link={leagueLink} />
			</h3>

			{links.map((link) => (
				<SidebarLink link={link} key={link} />
			))}
		</div>
	);
}

export default async function Layout({ children }) {
	const leagues = await getData();
	return (
		<div
			className='w-full px-4 py-4  box-border max-w-2xl '
			style={{ maxWidth: '1700px' }}
		>
			<Header />

			<div className='flex flex-col md:flex-row '>
				<div className='flex md:flex-col overflow-scroll scrollbar-hide md:mr-4 '>
					{Object.keys(leagues).map((league) => (
						<LeagueOrSport
							league={league}
							data={leagues[league]}
							key={league}
						/>
					))}
				</div>

				<div className='flex-1'>{children}</div>
			</div>

			<Footer />
		</div>
	);
}

const SidebarLink = ({ link }) => {
	const { name, photoUrl, endpoint } = link;
	return (
		<a>
			<Link href={endpoint} passhHref prefetch={false}>
				<a>
					<div
						className={`h-full flex md:flex-row flex-col justify-center items-center rounded-lg md:border-0 md:justify-start md:px-0 py-1 ${
							photoUrl ? 'px-4' : 'px-1'
						} `}
					>
						{photoUrl && (
							<img
								src={photoUrl}
								className='p-1 bg-dark4 rounded-3xl md:bg-none'
								width='24'
							></img>
						)}
						{/* <Image src={league.url} width={50} /> */}
						<h3
							className={`${
								photoUrl
									? ' md:ml-2 text-sm text-gray-300 font-semibold '
									: 'text-sm text-gray-300 font-bold '
							}  whitespace-nowrap mt-1 md:mt-0`}
						>
							{name}
						</h3>
					</div>
				</a>
			</Link>
		</a>
	);
};
