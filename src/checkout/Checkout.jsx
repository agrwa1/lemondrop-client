import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

const Checkout = () => {
	return (
		<Box sx={{ display: 'flex', width: '100%', flexDirection: "column", justifyContent: "center", alignItems: 'center' }} >
			<Typography variant="h1" sx={{ margin: '1em 0' }} >🎉 Success! 🎉</Typography>
			<Typography variant="h2" sx={{ color: "#bbb", textAlign: 'center' }} >You have added funds to your account. Please feel free to go to your <Link to="/dashboard">Dashboard</Link> or check <Link to="/leagues/all">All Leagues.</Link></Typography>
		</Box>
	)
}


export default Checkout