'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter, useSearchParams, redirect } from 'next/navigation'
import getAuth from '../functions/getAuth'


// Signup component
export default function Page() {
	let router
	router = useRouter()
	const searchParams = useSearchParams()

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [birthday, setBirthday] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [referredFromCode, setReferredFromCode] = useState('');

	useEffect(() => {
		getAuth().then(res => {
			if (JSON.stringify(res) !== '{}' && typeof window !== 'undefined') {
				// user is signed in
				// router.push("/bets")
				redirect("/bets")
			}
		})
	}, [])

	// get code
	useEffect(() => {
		const code = searchParams.get('referral_code')
		if (!code || code.length !== 6) {
			redirect('/')
		}
		setReferredFromCode(convertLettersToUppercase(code))
	}, [])

	function convertLettersToUppercase(inputString) {
		let result = '';
		for (let i = 0; i < inputString.length; i++) {
			const char = inputString.charAt(i);
			if (/[a-zA-Z]/.test(char)) {
				result += char.toUpperCase();
			} else {
				result += char;
			}
		}
		return result;
	}


	// Function to format the phone number as users type
	const formatPhoneNumber = (input) => {
		// Remove non-digit characters
		const cleaned = input.replace(/\D/g, '');

		// Apply formatting based on length
		if (cleaned.length <= 3) {
			return cleaned;
		} else if (cleaned.length <= 6) {
			return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
		} else {
			return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
		}
	};

	// Handle changes in the phone number input
	const handlePhoneNumberChange = (e) => {
		const inputValue = e.target.value;
		const formattedValue = formatPhoneNumber(inputValue);
		setPhoneNumber(formattedValue);
	};

	const validateForm = () => {
		// birthday validation
		const splitBirthday = birthday.split("-")
		const bdayDate = new Date(parseInt(splitBirthday[0]), parseInt(splitBirthday[1]), parseInt(splitBirthday[2]))
		const now = Date.now()

		const diffMillis = now - bdayDate
		const diffYears = diffMillis / (1000 * 3600 * 24 * 365)

		if (diffYears < 18) {
			setError("Must be 18+ to join Lemondrop")
			return false
		}

		const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

		if (!firstName || !lastName || !email || !password || !phoneNumber) {
			setError('All fields are required.');
			return false;
		}

		if (!phoneRegex.test(phoneNumber)) {
			setError('Please enter a valid phone number in the format (123) 456-7890.');
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
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password,
				referred_from_code: referredFromCode,
				phone_number: phoneNumber.replace(/\D/g, ''), // Remove non-digit characters before sending to the server
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
			setLastName('');
			setEmail('');
			setPassword('');
			setPhoneNumber('');
		}
	};


	return (
		<section className="w-screen h-screen bg-gradient-to-r from-yellow to-ldPurple flex flex-col justify-center items-center">
			<div className="flex flex-col items-center  justify-center w-full px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-gray-900 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
							Sign up for Lemondrop
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
							<div className="flex space-x-2">
								<div className="w-1/2">
									<label htmlFor="firstName" className="block mb-2 text-sm font-bold text-gray-100">
										First Name
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
								<div className="w-1/2">
									<label htmlFor="lastName" className="block mb-2 text-sm font-bold text-gray-100">
										Last Name
									</label>
									<input
										type="text"
										name="lastName"
										id="lastName"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className="bg-gray-900 text-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-ldPurple focus:outline-none block w-full p-2.5"
										placeholder="Doe"
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
								<label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-100">
									Password
								</label>
								<input
									type="password"
									name="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									id="password"
									placeholder="••••••••"
									className="bg-gray-900 border border-gray-300 text-white sm:text-sm rounded-lg focus:border-ldPurple focus:outline-none block w-full p-2.5"
									required
								/>
							</div>

							<div className="flex space-x-2">

								<div className="w-1/2">
									<label htmlFor="phoneNumber" className="block mb-2 text-sm font-bold text-gray-100">
										Phone Number
									</label>
									<input
										type="tel"
										name="phoneNumber"
										id="phoneNumber"
										value={phoneNumber}
										onChange={handlePhoneNumberChange}
										className="bg-gray-900 text-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-ldPurple focus:outline-none block w-full p-2.5"
										placeholder="(123) 456-7890"
										required
									/>
								</div>

								<div className="w-1/2">
									<label htmlFor="referral_code" className="block mb-2 text-sm font-bold text-gray-100">
										Referral Code
									</label>
									<input
										type="text"
										name="referral_code"
										id="referral_code"
										value={referredFromCode}
										placeholder="Referral Code"
										disabled
										className="bg-gray-900 text-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-ldPurple focus:outline-none block w-full p-2.5"
										required
									/>
								</div>


							</div>
							<div className="w-full" data-te-datepicker-init
								data-te-input-wrapper-init >
								<label htmlFor="birthday" className="block mb-2 text-sm font-bold text-gray-100 ">
									Birthday
								</label>
								<input type="date"
									className="bg-gray-900 placeholder-gray-400 text-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-ldPurple focus:outline-none block w-full p-2.5"
									value={birthday}
									required
									onChange={e => setBirthday(e.target.value)}
									id="start" name="birthday" />

							</div>


							<button
								type="submit"
								className="w-full bg-ldPurple focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							>
								Sign up
							</button>
							<p className="text-sm font-light text-gray-500">
								Already have an account? <Link href="/login" className="font-medium text-ldPurple underline" prefetch={false} >Log in</Link>
							</p>
						</form>
					</div>
				</div>
				{loading && <p className="mt-4">Loading ...</p>}
				{error && (
					<div className="p-4 mt-4 text-sm w-full sm:w-auto rounded-lg bg-gray-800 text-red-400 text-center" role="alert">
						{error}
					</div>
				)}
			</div>
		</section>
	);
}
