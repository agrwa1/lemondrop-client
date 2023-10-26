import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom'


export default function GameCard({ game }) {
	const sportTitle = game.sport_title
	console.log(game)
	const startTime = `${(new Date(game.commence_time)).toLocaleDateString()} ${(new Date(game.commence_time)).toLocaleTimeString()}`



	const tableData = [
		{
			name: game.away_team,
			spread: game.spreads_exist ? `${game.away_spread_point > 0 ? `+${game.away_spread_point}` : game.away_spread_point} ${game.away_spread_price > 0 ? `+${game.away_spread_point}` : game.away_spread_price}` : "-",
			moneyline: game.moneylines_exist ? `${game.away_moneyline_price > 0 ? `+${game.away_moneyline_price}` : game.away_moneyline_price}` : '-',
			totals: game.totals_exist ? `O${game.over_point} ${game.over_price > 0 ? `+${game.over_price}` : game.over_price}` : "-"
		},
		{
			name: game.home_team,
			spread: game.spreads_exist ? `${game.home_spread_point > 0 ? `+${game.home_spread_point}` : game.home_spread_point} ${game.home_spread_price > 0 ? `+${game.home_spread_point}` : game.home_spread_price}` : "-",
			moneyline: game.moneylines_exist ? `${game.home_moneyline_price > 0 ? `+${game.home_moneyline_price}` : game.home_moneyline_price}` : '-',
			totals: game.totals_exist ? `U${game.under_point} ${game.under_price > 0 ? `+${game.under_price}` : game.under_price}` : "-"
		},
	]

	if (sportTitle)

		return (
			<Grid item xs={12} sm={12} md={6} lg={4} key={game.id} >
				<TableContainer component={Paper}>
					<Table>
						<caption  >
							<Box sx={{ display: 'flex', justifyContent: "space-between", width: '100%' }} >
								{startTime}
								<Link to={`/game/${game.id}`} style={{ color: "red", fontWeight: 'bold', textDecoration: 'underline' }} >Bet Now</Link>
							</Box>
						</caption>
						<TableHead>
							<TableRow sx={{ backgroundColor: "white" }}>
								<TableCell sx={styles.tableHeader} >Team ({sportTitle}) </TableCell>
								<TableCell sx={styles.tableHeader} align="right">Spread</TableCell>
								<TableCell sx={styles.tableHeader} align="right">MLine</TableCell>
								<TableCell sx={styles.tableHeader} align="right">Totals</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{
								tableData.map(row =>
									<TableRow
										key={row.name}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }} >
											{row.name}
										</TableCell>
										<TableCell align="right">{row.spread}</TableCell>
										<TableCell align="right">{row.moneyline}</TableCell>
										<TableCell align="right">{row.totals}</TableCell>
									</TableRow>
								)
							}

							{/* <TableRow key="date">
								<TableCell>{datetime}</TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell align="right">
									<Link to={`/bet?gameid=${game.GameId}`} style={{ color: "red", fontWeight: 'bold', textDecoration: 'underline' }} >Bet Now</Link>
								</TableCell>
							</TableRow> */}
						</TableBody>
					</Table>
				</TableContainer>

			</Grid >
		)

}

const styles = {

	tableHeader: {
		color: 'red',
		fontWeight: 'bold'
	}
}