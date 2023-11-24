import React from 'react'

import { Box, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<Box className="footer-container">
			<Grid container>
				<Grid item xs={12} md={4}>
					<Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
						<Box className="footer-grid-item">
							<Box className="word-logo" >
								<Typography sx={{ fontFamily: "Lobster", fontSize: "32px" }} color="primary" variant="h3">lemondrop</Typography>
								<Typography variant="h6" style={{ fontSize: "16px" }} >SPORTSBOOK</Typography>
							</Box>

						</Box>
					</Link>
				</Grid>

				<Grid item xs={12} md={4}>
					<Box className="footer-grid-item">
						<Typography variant="h6" sx={{ fontWeight: 'bold' }}>BETTING</Typography>
						<Box sx={{ margin: '0.5em 0' }}>
							<Link to="/terms" style={{ textDecoration: 'none', color: 'white' }}>
								<Typography variant="body1" sx={{ color: '#bbb' }} >Terms of Services</Typography>
							</Link>
						</Box>

						<Box sx={{ margin: '0.5em 0' }}>
							<Link to="/privacy" style={{ textDecoration: 'none', color: 'white' }}>
								<Typography variant="body1" sx={{ color: '#bbb' }} >Privacy Policy</Typography>
							</Link>
						</Box>
					</Box>
				</Grid>

				<Grid item xs={12} md={4}>
					<Box className="footer-grid-item">
						<Typography variant="h6" sx={{ fontWeight: 'bold', }}>HELP</Typography>
						<Typography variant="body1" sx={{ margin: '0.5em 0', color: '#bbb' }} >contact@lemondrop.bet</Typography>
						<Typography variant="body1" sx={{ margin: '0.5em 0', color: '#bbb' }} >1-800-GAMBLER</Typography>
					</Box>
				</Grid>
			</Grid>

			<Grid item xs={12}>
				<Typography variant="body2" sx={{ color: "#bbb", marginBottom: "1em" }}>© 2023 LEMONDROP</Typography>
				<Typography variant="body2" sx={{ color: "#bbb" }}>Lemondrop and related trademarks are used under license. All Rights Reserved. Certain content reproduced under license.</Typography>
			</Grid>

		</Box>
	)
}

export default Footer
