import React, { useState, useEffect } from 'react'

import { Box } from '@mui/material'
import { Grid, styled, useTheme, Button, Card, CardContent, CardActions, CssBaseline, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGamepad, faChessBoard, faChartLine, faFootball, faBasketball, faBaseballBatBall, faHockeyPuck } from '@fortawesome/free-solid-svg-icons'

import { useNavigate, Navigate, Link, useLocation } from 'react-router-dom'
import nbaLogo from '../nba-logo.png'
// import "./styles.css"
// import MenuIcon from '@mui/icons-material/Menu';
import Footer from './Footer'
import { useAuth } from '../App'
import axios from 'axios'
import Logo from './lemondrop-logo-1.png'
// import { Link } from 'react-router-dom'


export default function MiniDrawer({ children }) {
	const [leagues, setLeagues] = useState([])
	const [sports, setSports] = useState([])
	useEffect(() => {
		axios.get("https://lemondrop-api.onrender.com/api/games/leagues").then(res => {
			setLeagues(res.data)
		})
	}, [])

	useEffect(() => {
		axios.get("https://lemondrop-api.onrender.com/api/games/sports").then(res => {
			setSports(res.data)
		})
	}, [])

	const { user, token } = useAuth()


	return (

		<Box className="container">

			<CssBaseline />

			<Box className="navbar"  >

				<Box className="nav-left"  >
					<Link to="/dashboard" className="link-reset" >
						<Box className="full-logo">
							<img src={Logo} width="64" />
							<Box className="word-logo" >
								<Typography sx={{ fontFamily: "Lobster", fontSize: "32px", color: '#ffff00' }} variant="h3">lemondrop</Typography>
								<Typography variant="h6" style={{ fontSize: "16px" }} >SPORTSBOOK</Typography>
							</Box>
						</Box>
					</Link>

					<Link to="/dashboard" className="link-reset" >
						<Box className="nav-link nav-link-left">
							<Typography variant='body1'>Home</Typography>
						</Box>
					</Link>

					<Link to="bets" className="link-reset" >
						<Box className="nav-link nav-link-left " >
							<Typography variant='body1'>My Bets</Typography>
						</Box>
					</Link>
				</Box>
				{
					user &&
					<Link to="/dashboard" className="link-reset">
						<Box className="nav-right">
							<Box className="nav-link nav-link-profile">
								<Typography className="nav-link" variant='body1' sx={{ fontWeight: "bold" }} >Dashboard</Typography>
							</Box>
						</Box>
					</Link>
				}

				{
					!user &&
					<Box className="nav-right nav-right-noauth" >
						<Box className="nav-auth-btn signup-btn" >
							Join Now
						</Box>
						<Box className="nav-auth-btn login-btn" >
							Log In
						</Box>
					</Box>

				}

			</Box>

			<Box className="desktop-main">
				<Grid container spacing={2}  >

					<Grid item sm={2} >
						<Box className="sidebar" sx={{ marginTop: '2em' }}>
							<Link to="/leagues/all" style={{ textDecoration: 'none' }} >
								<Box className="all-sport-header-container" >
									<Typography sx={{ color: "#ccc", fontSize: '1.2em', fontWeight: 'bold', marginBottom: ".7em" }} variant="h3" className="all-sports-header" >All Leagues</Typography>
									{
										leagues.map(l => <LeagueSidebarLink league={l} key={l.id} />)
									}
								</Box>
							</Link>
						</Box>
					</Grid>
					<Grid item sm={10} >
						{children}
					</Grid>
				</Grid>
			</Box>

			<Box className="mobile-nav-links" >
				<LeagueLinkButton key="All Leagues" league={{ league_id: "all", league_name: "All Leagues" }} fullLink="/leagues/all" />
				{
					leagues.map(l => <LeagueLinkButton key={l.id} league={l} />)
				}
			</Box>


			<Box className="mobile-main">
				{children}
			</Box>

			<Footer />

		</Box>


	);
}




const LeagueSidebarLink = ({ league }) => {

	let leagueName = league.league_name
	// if (league.league_name.length > 15) {
	// 	leagueName = league.league_name.substring(0, 15) + "..."
	// }

	return (
		<Link to={`/games/${league.league_id}`} className="link-reset">
			<Box className={`sidebar-link ${window.location.pathname.includes(league.league_id)} ? "sidebar-link-active : ""`} >
				<Typography variant='body1' style={{ fontSize: '15px', color: '#aaa' }} >{leagueName}</Typography>
			</Box>
		</Link>
	)
}

const LeagueLinkButton = ({ league, fullLink }) => {
	let link = ""
	if (!fullLink) {
		link = `/games/${league.league_id}`
	} else {
		link = fullLink
	}

	return (
		<Link to={link} className="link-reset">
			<Box className={`sport-link-container-mobile ${window.location.pathname.includes(league.league_id)} ? "active-mobile-link" :"" `}>
				<Typography variant="body2" >{league.league_name}</Typography>
			</Box>
		</Link>
	)
}

const SportLinkButton = ({ sport }) => {
	return (
		<Link to={`/sports/${sport.name.toLowerCase()}`} className="link-reset">
			<Box className={`sport-link-container-mobile ${window.location.pathname.includes(sport.name.toLowerCase())} ? "active-mobile-link" :"" `}>
				<Typography variant="body2" >{sport.name}</Typography>f
			</Box>
		</Link>
	)

}


const SportSidebarLink = ({ sport }) => {
	const sportLink = sport.name.toLowerCase().replace(" ", "-")

	return (
		<Link to={`/sports/${sportLink}`} className="link-reset">
			<Box className={`sidebar-link ${window.location.pathname.includes(sportLink)} ? "sidebar-link-active : ""`} >
				<Typography variant='body1' style={{ color: '#aaa' }} >{sport.name}</Typography>
			</Box>
		</Link>
	)
}