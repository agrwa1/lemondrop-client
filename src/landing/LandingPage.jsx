import React from 'react'
import { Typography, Box, CssBaseline, Button } from '@mui/material'
import Layout from '../layout'

import MoneyHeroImg from './money-1.png'
import HeroBg from './mahomes-throwing.jpeg'
import ProLogos from './pro-logos.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { useAuth } from '../App'

const LandingPage = () => {
	const { user } = useAuth()
	console.log(user)

	let linkEnd = "/signup"
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
				{
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
				}

			</nav>

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


			<Box className="hero" >
				<Box className="hero-left-container">
					<Box className="hero-left">
						<h3 className="hero-main-topper">The Next Generation Sportsbook</h3>
						<h1 className="hero-main-title">BET WITH LEMONDROP.</h1>
						<h2 className="hero-main-subtitle">Join Lemondrop Today. Bet On Your Favorite Sports Teams and Watch Them Win. Click Below to Start.</h2>
						<Link to={linkEnd} className="link-reset">
							<Box className="hero-ctas-container" >
								<button className="hero-cta-1 hero-cta">Join Now</button>
								<button className="hero-cta hero-cta-2" >Get Started</button>
							</Box>
						</Link>
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
