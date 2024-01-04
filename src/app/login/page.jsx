'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import getAuth from '../functions/getAuth'

export default function Page() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	useEffect(() => {
		getAuth().then(res => {
			if (JSON.stringify(res) !== '{}' && typeof window !== 'undefined') {
				// user is signed in
				router.push("/bets")
			}
		})
	}, [router])

	const handleSubmit = (e) => {
		e.preventDefault()
		// console.log(email, password)
		setError("")

		setLoading(true)
		axios.post("https://lemondrop-api.onrender.com/api/users/login", {
			email: email,
			password: password,
		}).then(res => {
			console.log("res", res.data.jwt)
			localStorage.setItem("jwt", res.data.jwt)
			router.push("/bets")
		}).catch(err => {
			console.log(err)
			setError("Invalid credentials. Please try again")
		}).finally(() => {
			setLoading(false)
			setEmail("")
			setPassword("")
		})
	}

	return (

		<section className="w-screen h-screen bg-gradient-to-r from-yellow to-ldPurple flex flex-col justify-center items-center">
			<div className="flex flex-col items-center  justify-center w-full px-6 py-8 mx-auto md:h-screen lg:py-0">

				{/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
					<img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
					Lemondrop
				</a> */}
				<div className="w-full bg-gray-900 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
							Sign in to Lemondrop
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
							<div>
								<label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-100 ">Your Email</label>
								<input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-900 text-white border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-ldPurple focus:outline-none block w-full p-2.5 " placeholder="name@company.com" required={true} />
							</div>
							<div>
								<label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-100 ">Password</label>
								<input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-900 border border-gray-300 text-white sm:text-sm rounded-lg focus:border-ldPurple focus:outline-none  block w-full p-2.5 " required={true} />
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">

									<div className="flex items-center h-5">
										<input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
									</div>

									<div className="ml-3 text-sm">
										<label htmlFor="remember" className="text-gray-500 ">Remember me</label>
									</div>
								</div>
								{/* <a href="#" className="text-sm font-medium text-gray-600 underline">Forgot password?</a> */}
							</div>
							<button type="submit" className="w-full bg-ldPurple  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>

							<p className="text-sm font-light text-gray-500 ">
								Don’t have an account yet? <Link href="/signup" className="font-medium text-ldPurple underline" prefetch={false} >Sign up</Link>
							</p>
						</form>
					</div>
				</div>

				{
					loading &&
					<p className="mt-4" >Loading ...</p>
				}


				{
					error &&
					<div className="p-4 mt-4 text-sm w-full sm:w-auto rounded-lg  bg-gray-800 text-red-400 text-center" role="alert">
						Login Failed. Please Sign Up if You Are Not a User.
					</div>
				}

			</div>
		</section>
	);
}