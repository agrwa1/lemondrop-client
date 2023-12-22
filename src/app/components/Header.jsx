'use client'
import React, { useEffect, useState } from 'react'
import WordLogo from "./WordLogo";
import Link from 'next/link'
import getAuth from '../functions/getAuth'


export default function Header() {
	const [user, setUser] = useState({})

	useEffect(() => {
		getAuth().then(res => {
			setUser(res)
		})
	}, [])

	if (Object.keys(user).length) {
		return (
			<nav className="flex justify-between align-middle mb-2 w-full ">
				<WordLogo />
				<AuthedComp />
			</nav>
		)
	} else {
		return (
			<nav className="flex justify-between align-middle mb-2 w-full">
				<WordLogo />
				<UnAuthedComp />
			</nav>
		)
	}
}

const AuthedComp = () => {
	return (
		<div className="flex justify-between  " >
			<Link href="/leagues/all">
				<div className=" py-2 rounded-xl hover:underline px-1 cursor-pointer text-lightGray font-semibold mr-4 " >
					Leagues
				</div>
			</Link>
			<Link href="/bets">
				<div className=" py-2 rounded-xl hover:underline px-1 cursor-pointer text-lightGray font-semibold " >
					My Bets
				</div>
			</Link>
		</div>
	)
}

const UnAuthedComp = () => {
	return (
		<div>
			<Link href="/leagues/all">
				<div className=" py-2 rounded-xl hover:underline px-1 cursor-pointer text-lightGray font-semibold " >
					Leagues
				</div>
			</Link>
			<Link href="/">
				<div className=" py-2 rounded-xl hover:underline px-1 cursor-pointer text-lightGray font-semibold " >
					Join Now
				</div>
			</Link>
			{/* <div className="py-2 px-8 rounded-lg text-gray-900">
				Log In
			</div> */}
		</div>
	)
}
