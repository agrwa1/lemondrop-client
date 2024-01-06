'use client'

import React, { useEffect, useState, } from 'react'
import getAuth from '../functions/getAuth'
import { redirect, useRouter } from 'next/navigation'
import axios from 'axios'
import BetsSection from './BetsSection';
import Link from 'next/link'


export default function Page() {
	const [user, setUser] = useState({})
	const [referralCode, setReferralCode] = useState("")
	const [loggedOut, setLoggedOut] = useState(false)
	let router = useRouter()

	useEffect(() => {
		getAuth().then(u => {
			if (Object.keys(u).length === 0 || !u.current_availability) {
				router.push("/")
			}
			setUser(u)
			setReferralCode(u.referral_code)
		})

	}, [loggedOut])




	const handleLogout = () => {
		localStorage.setItem("jwt", "")
		setLoggedOut(true)
	}

	return (
		<div>
			{
				(Object.keys(user).length > 0) &&
				<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 ">
					<div className="p-5 bg-gray-900 rounded-lg shadow">
						<p className="text-gray-400 text-md">Availability</p>
						<p className="text-xl font-bold text-white">${parseFloat(user.current_availability).toFixed(2)}</p>
					</div>

					{/* <div className="p-5 bg-white rounded-lg shadow">
						<p className="text-gray-500 text-md">Availability</p>
						<p className="text-xl font-bold text-black">${parseFloat(user.current_availability).toFixed(2)}</p>
					</div> */}

					<div className="p-5 bg-gray-900 rounded-lg shadow">
						<p className="text-gray-400 text-md">Pending</p>
						<p className="text-xl font-bold text-white">${parseFloat(user.current_pending).toFixed(2)}</p>
					</div>

					<div className="p-5 bg-gray-900 rounded-lg shadow">
						<p className="text-gray-400 text-md">Free Play</p>
						<p className="text-xl font-bold text-white">${parseFloat(user.current_free_play).toFixed(2)}</p>
					</div>

					<div className="p-5 bg-gray-900 rounded-lg shadow">
						<p className="text-gray-400 text-md">Balance</p>
						<p className="text-xl font-bold text-white">${parseFloat(user.current_balance).toFixed(2)}</p>
					</div>
				</div>
			}




			<div className="">
				<div className="grid grid-cols-2 w-full gap-5 mt-8">
					<ShareButton shareUrl={`https://lemondrop.ag/signup?referral_code=${referralCode}`} shareTitle="Join Lemondrop Sportsbook!" />
					<Link href="/contact" prefetch={false} className="">
						<p className="font-bold text-gray-300 rounded-xl justify-center flex items-center w-full p-4 border border-ldPurple">
							Contact Support
						</p>
					</Link>
				</div>

				{/* <div className="my-4 border-2 flex justify-center items-center font-bold rounded-md border-ldPurple p-2" onClick={handleLogout}>
					Logout
				</div> */}

				<BetsSection />
			</div>
		</div>

	)
}


const ShareButton = ({ shareUrl, shareTitle }) => {
	const [shareOrCopy, setShareOrCopy] = useState('');
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		if (navigator.share) {
			setShareOrCopy('share');
		} else {
			setShareOrCopy('copy');
		}
	}, []);

	const handleShareClick = async () => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: shareTitle,
					text: "Join the Fun on Lemondrop Sportsbook Today!",
					url: shareUrl,
				});
			} else {
				await copyToClipboard(shareUrl);
				setShowPopup(true);

				// Hide the popup after 2 seconds (adjust as needed)
				setTimeout(() => {
					setShowPopup(false);
				}, 2000);
			}
		} catch (error) {
			console.error('Error sharing:', error);
		}
	};

	const copyToClipboard = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			console.log('Link copied to clipboard');
		} catch (error) {
			const textarea = document.createElement('textarea');
			textarea.value = text;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
			console.log('Link copied to clipboard (fallback)');
		}
	};

	return (
		<div className="relative w-full flex justify-center cursor-pointer ">
			<button onClick={handleShareClick} className="font-bold text-gray-300 rounded-xl justify-center items-center w-full p-2 border border-ldPurple " >
				{shareOrCopy === 'copy' ? (showPopup ? "Copied To Clipboard!" : "Copy Referral Link") : 'Invite Friends'}
			</button>

		</div>
	);
};
