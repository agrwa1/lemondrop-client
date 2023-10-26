import React from 'react'
import Header from '../layout/Header'

import { Box, Grid, Typography, Button, Input } from '@mui/material'
import { useAuth } from '../App'
import { getAuth } from '../auth/authFunctions'

const Profile = () => {
	const { user, signOut } = useAuth()
	return (
		<div>
			<Header title="My Profile" subtitle="Sports and Me" />

			<Grid container spacing={2} justify="space-between" alignItems="stretch" >

				<Grid item xs={12} sm={12} md={6}>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }} >
						<Typography variant="h5">{user.first_name} {user.last_name}</Typography>
						{/* <Typography variant="h5">Sazzburg</Typography> */}
					</Box>
				</Grid>

				<Grid item xs={12} sm={12} md={6}>
					<Box sx={{ height: '30vh', border: '1px solid black' }} >
						<Typography variant="h3">{user.first_name}</Typography>
					</Box>
					<Button variant='contained' onClick={signOut} >Sign out</Button>
				</Grid>

			</Grid>

		</div>
	)
}

export default Profile
