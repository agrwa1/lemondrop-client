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


export default function GameCard({ game }) {
	// console.log(game)

	const away = game.away_team
	const home = game.home_team
	const startTime = `${(new Date(game.commence_time)).toLocaleDateString()} ${(new Date(game.commence_time)).toLocaleTimeString()}`
	const sportTitle = game.sport_title

	const lines = game.bookmakers[0].markets[0].outcomes
	const spreads = game.bookmakers[0].markets[1].outcomes
	const totals = game.bookmakers[0].markets[2].outcomes

	let homeLine = 0
	let awayLine = 0

	let homeSpreadPoint = 0
	let homeSpreadPrice = 0
	let awaySpreadPoint = 0
	let awaySpreadPrice = 0

	let overPoint = totals[0].point
	let overPrice = totals[0].price
	let underPoint = totals[1].point
	let underPrice = totals[1].price

	if (lines[0].name == away) {
		awayLine = lines[0].price
		homeLine = lines[1].price

		awaySpreadPoint = spreads[0].point
		awaySpreadPrice = spreads[0].price
		homeSpreadPoint = spreads[1].point
		homeSpreadPrice = spreads[1].price
	} else {
		homeLine = lines[0].price
		awayLine = lines[1].price

		awaySpreadPoint = spreads[1].point
		awaySpreadPrice = spreads[1].price
		homeSpreadPoint = spreads[0].point
		homeSpreadPrice = spreads[0].price
	}





	const tableData = [
		{
			name: away,
			spread: awaySpreadPoint == 0 ? "-" : (awaySpreadPoint > 0 ? `+${awaySpreadPoint} ${awaySpreadPrice}` : `${awaySpreadPoint} ${awaySpreadPrice}`),
			moneyline: awayLine == 0 ? "-" : (awayLine > 0 ? `+${awayLine}` : awayLine),
			totals: overPoint == 0 ? "-" : (`O${overPoint} ${overPrice}`)
		},
		{
			name: home,
			spread: homeSpreadPoint == 0 ? "-" : (homeSpreadPoint > 0 ? `+${homeSpreadPoint} ${homeSpreadPrice}` : `${homeSpreadPoint} ${homeSpreadPrice}`),
			moneyline: homeLine == 0 ? "-" : (homeLine > 0 ? `+${homeLine}` : homeLine),
			totals: underPoint == 0 ? "-" : (`U${underPoint} ${underPrice}`)
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
								<Link to={`/games/${game.id}`} style={{ color: "red", fontWeight: 'bold', textDecoration: 'underline' }} >Bet Now</Link>
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