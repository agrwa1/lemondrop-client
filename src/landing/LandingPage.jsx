import React, { useState, useEffect, useRef } from 'react'
import { Typography, Box, CssBaseline, Button, TextField, Snackbar } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import Layout from '../layout'

import MoneyHeroImg from './money-1.png'
import HeroBg from './mahomes-throwing.jpeg'
import ProLogos from './pro-logos.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useAuth } from '../App'
import axios from 'axios'

const LandingPage = () => {
	const { user } = useAuth()
	const [email, setEmail] = useState("")
	const [emailValid, setEmailValid] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [success, setSuccess] = useState(false)
	const [failure, setFailure] = useState(false)

	const inputRef = useRef()


	const handleEmailChange = e => {
		const rawEmail = e.target.value
		setEmail(rawEmail)
		let valid = rawEmail.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		setEmailValid(valid)
	}

	const handleSubmit = () => {
		if (!emailValid || submitting) {
			return
		}
		setSubmitting(true)
		const url = "https://lemondrop-api.onrender.com/api/mailing/add"
		console.log(email)
		const body = {
			email: email
		}

		console.log(body)
		axios.post(url, body).then(() => {
			setSuccess(true)
		}
		).catch(e => {
			setFailure(true)
		}).finally(() => {
			setSubmitting(false)
			setEmail("")
		})
	}

	// try {
	// 	const e = user.email
	// 	linkEnd = "/dashboard"
	// } catch (e) {
	// 	pass
	// }


	return (
		<main className="landing-main">

			<CssBaseline />
			<nav>
				<Box className="word-logo" >
					<Typography sx={{ fontFamily: "Lobster", fontSize: "32px" }} color="primary" variant="h3">lemondrop</Typography>
					<Typography variant="h6" style={{ fontSize: "16px" }} >SPORTSBOOK</Typography>
				</Box>
				{/* {
					user &&
					<Link to={linkEnd} className="link-reset">
						<Box sx={{ display: 'flex' }}>
							<button className={"nav-primary-cta"}>Dashboard</button>
						</Box>
					</Link>
				}
				{
					!user &&
					<Link to={linkEnd} className="link-reset">
						<Box sx={{ display: 'flex' }}>
							<button className={"nav-primary-cta"}>Sign Up Now</button>
						</Box>
					</Link>
				} */}

			</nav>

			<Box>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>

			</Box>


			<Box className="hero" >
				<Box className="hero-left-container">
					<Box className="hero-left">
						<h3 className="hero-main-topper">The Next Generation Sportsbook</h3>
						<h1 className="hero-main-title">BET WITH LEMONDROP.</h1>
						<h2 className="hero-main-subtitle">Join the Lemondrop Waitlist. Fill Out Your Email And We'll Let You Know When You're In.</h2>
						{/* <h2 className="hero-main-subtitle">Join Lemondrop Today. Bet On Your Favorite Sports Teams and Watch Them Win. Click Below to Start.</h2> */}
						{/* <Link to={linkEnd} className="link-reset">
							<Box className="hero-ctas-container" >
								<button className="hero-cta-1 hero-cta">Join Now</button>
								<button className="hero-cta hero-cta-2" >Get Started</button>
							</Box>
						</Link> */}
						<Box className="hero-email-list">
							<TextField ref={inputRef} value={email} onChange={handleEmailChange} id="outlined-basic" sx={{ marginRight: '5em' }} label="Email" variant="outlined" className="hero-email-input" />
							<button onClick={handleSubmit} className="hero-email-submit" disabled={!emailValid || submitting} >Submit Now</button>
						</Box>
						<Snackbar
							open={success}
							autoHideDuration={6000}
							onClose={() => setSuccess(false)}
							message="You're on the mailing list!"
						/>
						<Snackbar
							open={failure}
							autoHideDuration={6000}
							onClose={() => setFailure(false)}
							message="Something went wrong. Please try again."
						/>
					</Box>

				</Box>

				<Box className="hero-right">
					<img src={ProLogos} className="hero-graphic-right" ></img>
				</Box>
			</Box>

		</main>
	)
}

export default LandingPage
