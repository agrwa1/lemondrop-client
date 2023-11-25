import React, { useEffect, useState } from 'react'

import { Button, Typography, Box, Grid } from '@mui/material'
import { useAuth } from '../App'

import Header from '../layout/Header'
import axios from 'axios'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import { CheckCircleOutline } from '@mui/icons-material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BetsSection from './BetsSection'

import moment from 'moment'

const Dashboard = () => {
	const { user, update } = useAuth()

	// useEffect(() => {
	// 	update()
	// }, [])

	return (
		<div>
			{/* <Box>
				<Header title="My Dashboard" subtitle="This is where you see everything at a glance" />
				<Typography variant="h1">My Dashboard</Typography>
			</Box> */}

			<Grid container spacing={5} >

				<Grid item xs={12} sm={6} lg={3}>
					<Box sx={{ padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Balance</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2" sx={{ fontSize: "54px" }} >${parseFloat(user.current_balance).toFixed(2)}</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<Box sx={{ padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Pending</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2" sx={{ fontSize: "54px" }}>${parseFloat(user.current_pending).toFixed(2)} </Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<Box sx={{ padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Free Play</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2" sx={{ fontSize: "54px" }}>${parseFloat(user.current_free_play).toFixed(2)} </Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} lg={3}>
					<Box sx={{ padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Profit</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2" sx={{ fontSize: "54px" }}>${parseFloat(user.total_profit).toFixed(2)} </Typography>
					</Box>
				</Grid>

			</Grid>

			{/* <Box sx={{ marginBottom: '3em' }} /> */}

			<Grid container spacing={3}>

				<Grid item xs={12} md={12} lg={12}>
					<FundsSection user={user} />
				</Grid>


				<Grid item xs={12} md={12} lg={8} xl={8}>
					<BetsSection />
				</Grid>
				<Grid item xs={12} md={12} lg={4} xl={4}>
					<ProfileSection />
				</Grid>


			</Grid>
		</div>
	)
}

const FundsSection = ({ user }) => {
	const [withdrawConfirmation, setWithdrawConfirmation] = useState(false)

	const handleWithdrawFunds = () => {
		if (!withdrawConfirmation) {
			setWithdrawConfirmation(true)
			return
		}


	}

	return (
		<Box sx={{ display: 'flex', width: '100%', margin: "1em 0" }} >
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<form action={`https://lemondrop-api.onrender.com/api/payments/checkout/${user.user_id}`} method="post" style={{ width: '100%' }} >
						<button type="submit" className="profile-form-btn">
							Add Funds
						</button>
					</form>
				</Grid>

				<Grid item xs={12} sm={6}>
					<button onClick={handleWithdrawFunds} className="profile-form-btn">
						{
							!withdrawConfirmation &&
							"Withdraw Funds"
						}
						{
							withdrawConfirmation &&
							"All Funds Will Be Withdrawn"
						}
					</button>
				</Grid>
			</Grid>
		</Box>
	)
}


const ProfileSection = () => {
	const { signOut, user } = useAuth()
	const fullName = (user.first_name + " " + user.last_name).toUpperCase()

	return (
		<Box className={"profile-section-profile-header"} >
			<Box className={"profile-section-main"}>
				<Typography variant="h4" style={{ fontWeight: 'bold' }} >{fullName}</Typography>
				<Typography variant="h6" style={{ color: "#999" }} >{user.email}</Typography>
				<Typography variant="h6" style={{ color: "#999" }} >{user.phone_number}</Typography>
			</Box>
			<Button variant="contained" onClick={signOut}>Sign Out</Button>
		</Box>
	)
}

export default Dashboard
