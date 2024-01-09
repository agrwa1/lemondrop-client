'use client'
import React, { useEffect, useState } from 'react'
import WordLogo from "./WordLogo";
import Link from 'next/link'
import getAuth from '../functions/getAuth'


export default function Header() {
    // TODO: use local storage to remove unauthed flash state
    // const [user, setUser] = useState(localStorage.getItem("jwt") ? { authed: 'probably' } : {})
    const [user, setUser] = useState({})

    useEffect(() => {
        getAuth().then(res => {
            setUser(res)
        })
    }, [])

    if (Object.keys(user).length > 0) {
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
        <div className="flex justify-between" >
            <Link href="/leagues/all" prefetch={false} >
                <div className=" py-2 rounded-xl hover:underline px-1 cursor-pointer text-lightGray font-semibold mr-4 " >
                    Leagues
                </div>
            </Link>
            <Link href="/bets" prefetch={false} >
                <div className=" py-2 rounded-xl hover:underline px-1 cursor-pointer text-lightGray font-semibold " >
                    My Bets
                </div>
            </Link>
        </div>
    )
}

const UnAuthedComp = () => {
    return (
        <div className="flex justify-between">
            <Link href="/leagues/all" prefetch={false} >
                <div className=" py-2 rounded-xl hover:underline px-1 cursor-pointer text-lightGray font-semibold mr-4" >
                    Leagues
                </div>
            </Link>
            <Link href="/" prefetch={false} >
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
