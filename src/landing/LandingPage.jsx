import React from 'react'
import { Typography, Box, CssBaseline } from '@mui/material'
import Layout from '../layout'

import MoneyHeroImg from './money-1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

const LandingPage = () => {
	return (
		<main>

			<CssBaseline />
			<nav>
				<Box className="word-logo" >
					<Typography sx={{ fontFamily: "Lobster", fontSize: "32px" }} color="primary" variant="h3">lemondrop</Typography>
					<Typography variant="h6" style={{ fontSize: "16px" }} >SPORTSBOOK</Typography>
				</Box>
				<Typography variant="h3" style={{ fontSize: "16px" }} > Sportsbook</Typography>
			</nav>

			<Box className="hero" >
				<div className="sportsbook-hero">
					<div className="hero-overlay"></div>
					<div className="hero-content">
						<Typography variant="h1">Lemondrop Sportsbook Coming Soon</Typography>
						<p>Make Your Own Luck</p>
						<div className="cta-buttons">
							<Link to="/dashboard">
								<button className="primary-cta">Get Started</button>
							</Link>

							<Link to="dashboard">
								<button className="secondary-cta">
									Explore <FontAwesomeIcon icon={faArrowRight} />
								</button>
							</Link>
						</div>
					</div>
				</div>
			</Box>

		</main>
	)
}

export default LandingPage
