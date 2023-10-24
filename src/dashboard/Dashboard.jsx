import React from 'react'

import { Typography, Box, Grid } from '@mui/material'
import { useAuth } from '../App'

import Header from '../layout/Header'

const Dashboard = () => {
	const { token } = useAuth()
	return (
		<div>
			<Box>
				<Header title="My Dashboard" subtitle="This is where you see everything at a glance" />
			</Box>

			<Grid container spacing={5} >

				<Grid item xs={12} sm={6} lg={3}>
					<Box sx={{ border: "1px solid black", padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h2">$100.00</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h6" sx={{ color: 'gray' }} >Total Balance</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<Box sx={{ border: "1px solid black", padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h2">$500.00</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h6" sx={{ color: 'gray' }} >Total Availability</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<Box sx={{ border: "1px solid black", padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h2">$500.00</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h6" sx={{ color: 'gray' }} >Free Play</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<Box sx={{ border: "1px solid black", padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h2">$500.00</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h6" sx={{ color: 'gray' }} >Total Availability</Typography>
					</Box>
				</Grid>

			</Grid>

			<Box sx={{ marginBottom: '3em' }} />

			<Grid container spacing={3}>

				<Grid item xs={12} md={12} lg={8} xl={8}>
					<Box sx={{ border: '1px solid black', height: '50vh', borderRadius: '10px' }}>
						{/* <Typography variant="h3">test</Typography> */}
					</Box>
				</Grid>

				<Grid item xs={12} md={12} lg={4} xl={4}>
					<Box sx={{ border: '1px solid black', height: '80vh', borderRadius: '10px' }}>
						{/* <Typography variant="h3">test</Typography> */}
					</Box>
				</Grid>


			</Grid>
		</div>
	)
}

export default Dashboard
