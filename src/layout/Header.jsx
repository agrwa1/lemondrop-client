import React from 'react'

import { Typography, Box } from '@mui/material'


const Header = ({ title, subtitle }) => {
	return (
		<Box sx={{ marginBottom: '1em' }}>
			<Typography sx={{ marginBottom: 1 }} variant="h1">{title}</Typography>
			<Typography sx={{ color: 'gray' }} variant="h6">{subtitle}</Typography>
		</Box>
	)
}

export default Header
