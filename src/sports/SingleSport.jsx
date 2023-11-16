import React from 'react'

import { Typography, Box, Grid } from '@mui/material'

const SingleSport = () => {

	const sport = window.location.pathname.split("/")[2]
	console.log(sport)

	return (
		<div>
			<Typography variant="h2">Single Sport</Typography>
		</div>
	)
}

export default SingleSport
