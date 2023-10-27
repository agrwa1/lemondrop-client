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
import { useAuth } from '../App'



export default function MiniDrawer({ children }) {
	const { user, token } = useAuth()
	const sports = [
		{ name: "NFL", link: "/games/americanfootball_nfl", icon: faFootball, id: "americanfootball_nfl" },
		{ name: "NCAAF", link: "/games/americanfootball_ncaaf", icon: faFootball, id: "americanfootball_ncaaf" },
		{ name: "NBA", link: "/games/basketball_nba", icon: faBasketball, id: "basketball_nba" },
		{ name: "NCAAB", link: "/games/basketball_ncaab", icon: faBasketball, id: "basketball_ncaab" },
		{ name: "NHL", link: "/games/icehockey_nhl", icon: faHockeyPuck, id: "icehockey_nhl" },
		{ name: "UEFA", link: "/games/soccer_uefa_champs_league", icon: faHockeyPuck, id: "icehockey_nhl" }
	]

	return (

		<Box className="container">

			<CssBaseline />

			<Box className="navbar"  >

				<Box className="nav-left"  >
					<Link to="/dashboard" className="link-reset" >
						<Box className="word-logo" >
							<Typography sx={{ fontFamily: "Lobster", fontSize: "32px" }} color="primary" variant="h3">lemondrop</Typography>
							<Typography variant="h6" style={{ fontSize: "16px" }} >SPORTSBOOK</Typography>
						</Box>
					</Link>

					<Link to="/" className="link-reset" >
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
					<Box className="nav-right">
						<Box className="nav-link nav-link-profile">
							<Typography className="nav-link" variant='body1'>My Profile</Typography>
						</Box>
					</Box>
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
							<Box >
								<Typography sx={{ color: "#ccc", fontSize: '1.2em', fontWeight: 'bold', marginBottom: ".7em" }} variant="h3" className="all-sports-header" >All Leagues</Typography>
								{
									sports.map(s => <SportSidebarLink sport={s} key={s.id} />)
								}
							</Box>
						</Box>
					</Grid>


					<Grid item sm={10} >
						{children}
					</Grid>
				</Grid>
			</Box>

			<Box className="mobile-nav-links" >
				{
					sports.map(s => <SportLinkButton key={s.name} sport={s} />)
				}
			</Box>


			<Box className="mobile-main">
				{children}
			</Box>

		</Box>


	);
}

const SportSidebarLink = ({ sport }) => {

	return (
		<Link to={sport.link} className="link-reset">
			<Box className={`sidebar-link ${window.location.pathname.includes(sport.link)} ? "sidebar-link-active : ""`} >
				<Typography variant='body1' style={{ color: '#aaa' }} >{sport.name}</Typography>
			</Box>
		</Link>
	)
}

const SportLinkButton = ({ sport }) => {
	return (
		<Link to={sport.link} className="link-reset">
			<Box className={`sport-link-container-mobile ${window.location.pathname.includes(sport.id)} ? "active-mobile-link" :"" `}>
				<Typography variant="body2"  >{sport.name}</Typography>
			</Box>
		</Link>
	)
}

