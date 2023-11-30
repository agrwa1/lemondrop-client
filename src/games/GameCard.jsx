import React, { useState, useEffect } from 'react'

import { Box, Button, Typography, Grid, Table, TableBody } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import moment from 'moment'
import axios from 'axios'

import GC1 from './TypeOneGameCard'
import GC2 from './TypeTwoGameCard'

export default function GameCard({ bets, game, raw, addBet, removeBet }) {
	const gameType = game.game_type
	return (
		<Box sx={{ width: '100%' }} >
			{
				gameType == "1" &&
				<GC1 bets={bets} game={game} raw={raw} addBet={addBet} removeBet={removeBet} />
			}
			{
				gameType == "2" &&
				<GC2 bets={bets} game={game} raw={raw} addBet={addBet} removeBet={removeBet} />
			}
		</Box>
	)

}

