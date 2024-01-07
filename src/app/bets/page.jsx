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
	const [isModalOpen, setIsModalOpen] = useState(false);

	let router = useRouter()

	useEffect(() => {
		getAuth().then(u => {
			if (Object.keys(u).length === 0) {
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


	const handleInfoClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 ">
				<div className="p-5 bg-gray-900 rounded-lg shadow">
					<p className="text-gray-400 text-md">Availability</p>
					{
						Object.keys(user).length > 0 ?
							<p className="text-xl font-bold text-white">${parseFloat(user.current_availability).toFixed(2)}</p> : <p className="text-xl font-bold text-white">$</p>
					}
				</div>

				<div className="p-5 bg-gray-900 rounded-lg shadow">
					<p className="text-gray-400 text-md">Pending</p>
					{
						Object.keys(user).length > 0 ?
							<p className="text-xl font-bold text-white">${parseFloat(user.current_pending).toFixed(2)}</p> : <p className="text-xl font-bold text-white">$</p>
					}
				</div>

				<div className="p-5 bg-gray-900 rounded-lg shadow">
					<p className="text-gray-400 text-md">Free Play</p>
					{
						Object.keys(user).length > 0 ?
							<p className="text-xl font-bold text-white">${parseFloat(user.current_free_play).toFixed(2)}</p> : <p className="text-xl font-bold text-white">$</p>
					}
				</div>

				<div className="p-5 bg-gray-900 rounded-lg shadow">
					<p className="text-gray-400 text-md">Balance</p>
					{
						Object.keys(user).length > 0 ?
							<p className="text-xl font-bold text-white">${parseFloat(user.current_balance).toFixed(2)}</p> : <p className="text-xl font-bold text-white">$</p>
					}
				</div>
			</div>




			<div className="">
				<div className="grid grid-cols-2 w-full gap-5 mt-8">

					<Link href="/contact" prefetch={false} className="">
						<p className="text-sm py-3 border-2 flex justify-center items-center font-bold rounded-md border-ldPurple p-2">
							Contact Support
						</p>
					</Link>

					<div className="text-sm border-2 flex justify-center items-center font-bold rounded-md border-ldPurple p-2" onClick={handleLogout}>
						Logout
					</div>

					<ShareButton shareUrl={`https://lemondrop.ag/signup?referral_code=${referralCode}`} shareTitle="Join Lemondrop Sportsbook!" />


					<div className="flex justify-between items-center font-bold rounded-md bg-ldPurple p-2 text-sm">
						<a target="_blank" rel="noopener noreferrer" href="https://venmo.com/u/Sohum-Agrawal" className="w-full flex justify-items-center" >
							<div className="w-full flex justify-center items-center">
								Pay Balance
							</div>
						</a>

						<button onClick={handleInfoClick} className="border border-gray-500 ml-2 font-bold bg-blue-500 text-white px-4 py-1 rounded-md">
							i
						</button>
						<InformationModal isOpen={isModalOpen} onClose={handleCloseModal} />
					</div>
				</div>

				<BetsSection />
			</div>
		</div >
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
		<button onClick={handleShareClick} className="w-full flex justify-center items-center font-bold rounded-md bg-ldPurple p-2 text-sm" >
			{shareOrCopy === 'copy' ? (showPopup ? "Copied To Clipboard!" : "Copy Referral Link") : 'Invite Friends'}
		</button>

	);
};

const InformationModal = ({ isOpen, onClose }) => {
	return (
		<div
			className={`fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
		>
			<div className="bg-dark p-4 rounded-md max-w-md mx-4">
				<p className="font-light" >Resetting every Monday at 12 am, the Lemondrop week includes your balance and availability.
					For losses, payments are due on Monday; for gains, payment occurs on Tuesday.
					Failure to make a payment results in account inactivity until settled, with possible additional fees.</p>

				<button onClick={onClose} className="w-full border border-gray mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
					Close
				</button>
			</div>
		</div>
	);
};