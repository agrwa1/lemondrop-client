import React from 'react'
import { Grid, Typography, Box, Button, Input, InputLabel, TextField, FormControl, Snackbar } from '@mui/material'

const Betslip = ({ bets }) => {
	return (
		<Box className="bet-slip">

			<Box className="bet-slip-header">
				<Box className="bet-slip-header-count">
					{bets.length}
				</Box>
				<Typography variant="h6" style={{ fontWeight: 'bold', fontSize: "16px", color: '#ccc' }} >Betslip</Typography>
			</Box>

			<Box className="bet-slip-divider" />

			{
				bets.length == 0 &&
				<Box className="empty-betslip-container">
					<Typography variant="h6">Empty betslip</Typography>
				</Box>
			}


			{
				bets.map(bet =>
					<Box className="bet-slip-option">
						<Typography variant="h6">bet.name</Typography>
					</Box>
				)
			}

		</Box>
	)
}

export default Betslip
