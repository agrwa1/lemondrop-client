'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import getAuth from '../functions/getAuth'

export default function Page() {
	let router
	router = useRouter()

	useEffect(() => {
		getAuth().then(res => {
			if (JSON.stringify(res) !== '{}' && typeof window !== 'undefined') {
				// user is signed in
				router.push("/bets")
			}
		})
	}, [])



	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);


	const validateForm = () => {
		if (!firstName || !email) {
			setError('All fields are required.');
			return false;
		}

		return true;
	};

	const handleSubmit = async (e) => {
		setError('');
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			setLoading(true);
			const url = "https://lemondrop-api.onrender.com/api/users/signup"
			// const url = "http://localhost:8080/api/users/signup"
			const response = await axios.post(url, {
				firstName,
				email,
			});

			if (typeof window !== 'undefined') {
				localStorage.setItem('jwt', response.data)
				router.push('/bets');
			}

		} catch (error) {
			setError('Signup failed. Please try again.');
		} finally {
			setLoading(false);
			setFirstName('');
			setEmail('');
		}
	};


	return (
		<section className="flex flex-col justify-center items-center">
			<div className="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl">
						Contact Lemondrop
					</h1>
					<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
						<div className="flex space-x-2">
							<div className="w-full">
								<label htmlFor="firstName" className="block mb-2 text-sm font-bold text-gray-100">
									Your Name
								</label>
								<input
									type="text"
									name="firstName"
									id="firstName"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="bg-gray-900 text-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-ldPurple focus:outline-none block w-full p-2.5"
									placeholder="John"
									required
								/>
							</div>
						</div>
						<div>
							<label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-100">
								Your Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bg-gray-900 text-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-ldPurple focus:outline-none block w-full p-2.5"
								placeholder="name@company.com"
								required
							/>
						</div>
						<div>
							<label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-100">
								Message
							</label>
							<textarea
								name="email"
								rows="5"
								id="email"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								className="bg-gray-900 text-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-ldPurple focus:outline-none block w-full p-2.5"
								placeholder="I was trying to place a bet and found a bug where ..."
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-ldPurple focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>
							Submit
						</button>

					</form>
				</div>
			</div>
			{loading && <p className="mt-4">Loading ...</p>}
			{error && (
				<div className="p-4 mt-4 text-sm w-full sm:w-auto rounded-lg bg-gray-800 text-red-400 text-center" role="alert">
					{error}
				</div>
			)}
		</section>
	);
}

