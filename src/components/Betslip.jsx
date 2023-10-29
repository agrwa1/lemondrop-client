import React, { useState, useEffect } from 'react'
import { Grid, Typography, Box, Button, Input, InputLabel, TextField, FormControl, Snackbar, Fab, Badge, } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';


const Betslip = ({ bets, setBets, removeBet }) => {
	const deleteAllBets = () => {
		setBets([])
	}

	const [mobileOpen, setMobileOpen] = useState(false)

	return (

		<Box style={{ width: '100%' }} >

			<Box className="bet-slip">
				<Box className="bet-slip-content">

					<Box className="bet-slip-header">
						<Box className="bet-slip-header-count">
							{bets.length}
						</Box>
						<Typography variant="h6" style={{ fontWeight: 'bold', fontSize: "16px", color: '#ccc' }} >Betslip</Typography>
					</Box>


					{
						bets.length == 0 &&
						<Box className="empty-betslip-container">
							<Typography variant="h6" style={{ color: '#aaa' }}>EMPTY BETSLIP</Typography>
						</Box>
					}

					{
						bets.length > 0 &&

						<Box className="bet-slip-option-container">
							{
								bets.map(bet =>
									<BetslipOption bet={bet} removeBet={removeBet} />
								)
							}
						</Box>
					}


				</Box>
				{
					bets.length > 0 &&
					<Box className="bet-slip-actions">
						<Button fullWidth variant="outlined" onClick={deleteAllBets} style={{ border: '0.5px solid #ff3008', margin: '1em 0', color: "#ff3008", fontWeight: 'bold', display: 'flex', alignItems: "center" }} >
							<DeleteOutlinedIcon />
							Delete All
						</Button>
						<Button fullWidth variant="contained" onClick={deleteAllBets} style={{ fontWeight: 'bold', display: 'flex', alignItems: "center" }} >
							Submit Bets
						</Button>
					</Box>
				}
			</Box>



			<Box className="bet-slip-mobile" >
				<Fab variant="extended" onClick={() => setMobileOpen(true)} color="primary" style={{ fontWeight: 'bold', color: "black", backgroundColor: 'white', margin: 0, top: 'auto', left: 20, bottom: 20, right: 'auto', position: 'fixed' }} className="mobile-bet-slip-fab">
					<AddIcon />
					{bets.length} Betslip
				</Fab>

			</Box>



		</Box>
	)
}

const BetslipOption = ({ bet, removeBet }) => {
	return (
		<Box className="betslip-option" >

			<Box onClick={() => removeBet(bet.Index)} style={{ cursor: 'pointer' }} >

				<RemoveCircleOutlineIcon style={{ color: '#ff3008' }} />
			</Box>

			<Box className="betslip-option-container">
				<Box className="betslip-option-header">
					<Box className="betslip-option-header-left">
						<Box className="betslip-option-header-text">
							<Typography variant="body1" style={{ fontWeight: 'bold' }} >{bet.BetOnTeam}</Typography>
							<Typography variant="body2" style={{ color: '#aaa' }} >{bet.BetType.toUpperCase()}</Typography>
						</Box>
						<Typography variant="body2" style={{ fontSize: "12px" }} > {bet.AwayTeam} @ {bet.HomeTeam} </Typography>
					</Box>

					<Box className="betslip-option-header-right">
						<Typography variant="body1" style={{ fontWeight: 'bold' }} >{bet.Odds > 0 ? `+${bet.Odds}` : bet.Odds}</Typography>
					</Box>

				</Box>
				<Box className="wager-win-amts">
					<FormControl fullWidth sx={{ mr: 1 }}>
						<InputLabel htmlFor="outlined-adornment-amount">Wager</InputLabel>
						<OutlinedInput
							id="outlined-adornment-amount"
							startAdornment={<InputAdornment position="start">$</InputAdornment>}
							label="Wager"
						/>
					</FormControl>
					<FormControl fullWidth sx={{ ml: 1 }}>
						<InputLabel htmlFor="outlined-adornment-amount">To Win</InputLabel>
						<OutlinedInput
							disabled
							id="outlined-adornment-amount"
							startAdornment={<InputAdornment position="start">$</InputAdornment>}
							label="To Win"
						/>
					</FormControl>
				</Box>
			</Box>

		</Box>
	)
}

export default Betslip
