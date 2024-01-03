'use client'

import React, { useEffect, useState, } from 'react'
import getAuth from '../functions/getAuth'
import { redirect } from 'next/navigation'
import axios from 'axios'
import BetsSection from './BetsSection';


export default function Page() {
	const [user, setUser] = useState({
	})

	useEffect(() => {
		getAuth().then(u => {
			if (JSON.stringify(u) === "{}") {
				redirect('/')
			}
			setUser(u)
		})
	}, [])




	return (
		<div>
			{
				(Object.keys(user).length > 0) &&
				<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 ">
					<div className="p-5 bg-white rounded-lg shadow">
						<p className="text-gray-500 text-md">Balance</p>
						<p className="text-xl font-bold text-black">${parseFloat(user.current_balance).toFixed(2)}</p>
					</div>

					<div className="p-5 bg-white rounded-lg shadow">
						<p className="text-gray-500 text-md">Pending</p>
						<p className="text-xl font-bold text-black">${parseFloat(user.current_pending).toFixed(2)}</p>
					</div>

					<div className="p-5 bg-white rounded-lg shadow">
						<p className="text-gray-500 text-md">Free Play</p>
						<p className="text-xl font-bold text-black">${parseFloat(user.current_free_play).toFixed(2)}</p>
					</div>

					<div className="p-5 bg-white rounded-lg shadow">
						<p className="text-gray-500 text-md">Profit</p>
						<p className="text-xl font-bold text-black">${parseFloat(user.total_profit).toFixed(2)}</p>
					</div>
				</div>
			}

			<div className="">
				<FundsSection user={user} />
				<BetsSection />
			</div>
		</div>

	)
}

const FundsSection = ({ user }) => {
	const [withdrawConfirmation, setWithdrawConfirmation] = useState(false);
	const [withdrawLoading, setWithdrawLoading] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleWithdrawFunds = () => {
		if (!withdrawConfirmation) {
			setWithdrawConfirmation(true);
			return;
		}

		setWithdrawLoading(true);
		// actually send post request :(
		let body = {
			email: user.email,
			user_id: user.user_id,
			name: user.first_name + ' ' + user.last_name,
		};
		const url = 'https://lemondrop-api.onrender.com/api/payments/payout';
		axios
			.post(url, body)
			.then(() => {
				console.log('successfully sent post request');
				setSnackbarMessage('Success! Check Your Email.');
			})
			.catch(() => {
				// console.log(err.response.data)
				setSnackbarMessage('Failed. Not Enough Funds.');
			});

		setWithdrawConfirmation(false);
		setWithdrawLoading(false);
	};

	return (
		<div className="flex w-full mt-6 ">
			<div className="grid grid-cols-2 gap-2 w-full ">

				<form
					action={`https://lemondrop-api.onrender.com/api/payments/checkout/${user.user_id}`}
					method="post"
					className="col-span-1"
				>
					<button className="flex rounded-xl justify-center items-center w-full p-4 bg-ldPurple " type="submit">
						Add Funds
					</button>
				</form>



				<button>

				</button>
			</div>

			<ShareButton shareUrl="https://lemondrop.ag" shareTitle="Lemondrop Sportsbook" />

			{snackbarMessage && (
				<div className="fixed bottom-0 left-0 p-4 w-full">
					<div className="bg-gray-800 text-white p-4 rounded-md">
						<p>{snackbarMessage}</p>
					</div>
				</div>
			)}
		</div>
	);
};


const ShareButton = ({ shareUrl, shareTitle }) => {
	const handleShareClick = async () => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: shareTitle,
					text: 'Check out this link!',
					url: shareUrl,
				});
			} else {
				// Fallback for browsers that do not support the Web Share API
				// You can implement your own share modal or other logic here
				alert('Web Share API is not supported in this browser.');
			}
		} catch (error) {
			console.error('Error sharing:', error);
		}
	};

	return (
		<button onClick={handleShareClick}>
			Share with Friends
		</button>
	);
};
