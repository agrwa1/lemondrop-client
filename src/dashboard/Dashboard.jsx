import React, { useEffect, useState } from 'react'

import { Button, Typography, Box, Grid, Snackbar, Skeleton, LinearProgress } from '@mui/material'
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

	if (!user.email) {
		// return <SkeletonDashboard />
		return <LinearProgress />
	} else return (
		<div>
			{/* <Box>
				<Header title="My Dashboard" subtitle="This is where you see everything at a glance" />
				<Typography variant="h1">My Dashboard</Typography>
			</Box> */}

			<Grid container spacing={5} >

				<Grid item xs={6} sm={6} lg={3}>
					<Box sx={{ padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Balance</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2" sx={{ fontSize: "36px", fontWeight: 'bold', }} >${parseFloat(user.current_balance).toFixed(2)}</Typography>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6} lg={3}>
					<Box sx={{ padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Pending</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2" sx={{ fontSize: "36px", fontWeight: 'bold', color: "#ffff00" }}>${parseFloat(user.current_pending).toFixed(2)} </Typography>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6} lg={3}>
					<Box sx={{ padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Free Play</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2" sx={{ fontSize: "36px", fontWeight: 'bold', color: "#fff" }}>${parseFloat(user.current_free_play).toFixed(2)} </Typography>
					</Box>
				</Grid>
				<Grid item xs={6} sm={6} lg={3}>
					<Box sx={{ padding: '2em', borderRadius: '10px' }}>
						<Typography variant="h6" sx={{ color: 'gray' }} >Profit</Typography>
						<Box sx={{ marginBottom: 1 }} />
						<Typography variant="h2" sx={{ fontSize: "36px", fontWeight: 'bold', color: "#00ff00" }}>${parseFloat(user.total_profit).toFixed(2)} </Typography>
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

const SkeletonDashboard = () => {
	return (
		<Box sx={{ border: '1px solid white', width: '100%' }} >
			<Grid container spacing={2} >
				{
					[1, 2, 3, 4].map(n =>
						<Grid item xs={6} sm={6} md={3} >
							<Skeleton variant="rectangular" height={'6em'} />
						</Grid>
					)
				}
			</Grid>
		</Box>
	)
}

const FundsSection = ({ user }) => {
	const [withdrawConfirmation, setWithdrawConfirmation] = useState(false)
	const [withdrawLoading, setWithdrawLoading] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState("")

	const handleWithdrawFunds = () => {
		if (!withdrawConfirmation) {
			setWithdrawConfirmation(true)
			return
		}

		setWithdrawLoading(true)
		// actually send post request :(
		let body = {
			email: user.email,
			user_id: user.user_id,
			name: user.first_name + ' ' + user.last_name
		}
		const url = "https://lemondrop-api.onrender.com/api/payments/payout"
		axios.post(url, body).then(() => {
			console.log("successfully sent post request")
			setSnackbarMessage("Success! Check Your Email.")
		}).catch(err => {
			// console.log(err.response.data)
			setSnackbarMessage("Failed. Not Enough Funds.")
		})

		setWithdrawConfirmation(false)
		setWithdrawLoading(false)

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
					<button onClick={handleWithdrawFunds} className="profile-form-btn profile-form-btn-2">
						{
							!withdrawConfirmation && !withdrawLoading &&
							"Withdraw Funds"
						}
						{
							withdrawConfirmation && !withdrawLoading &&
							"All Funds Will Be Withdrawn"
						}
						{
							withdrawLoading &&
							"Sending funds..."
						}
					</button>
				</Grid>
			</Grid>

			{
				snackbarMessage &&
				<Snackbar
					open={true}
					autoHideDuration={6000}
					onClose={() => setSnackbarMessage("")}
					message={snackbarMessage}
				// action={action}
				/>
			}
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
			{/* <Button variant="contained" onClick={signOut}>Sign Out</Button> */}
			<button className="profile-form-btn secondary-btn" onClick={signOut}>Sign Out</button>
		</Box>
	)
}

export default Dashboard
