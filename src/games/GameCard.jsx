import React, { useState } from 'react'

import { Box, Button, Typography, Grid, Table, TableBody } from '@mui/material'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import moment from 'moment'


export default function GameCard({ game, raw }) {
	const sportTitle = game.sport_title
	const startTime = moment(game.commence_time).calendar()



	const tableData = [
		{
			name: game.away_team,
			// spread: game.spreads_exist ? `${game.away_spread_point > 0 ? `+${game.away_spread_point}` : game.away_spread_point} ${game.away_spread_price > 0 ? `+${game.away_spread_point}` : game.away_spread_price}` : "-",
			spread_point: game.spreads_exist ? game.away_spread_point > 0 ? `+${game.away_spread_point}` : game.away_spread_point : "-",
			spread_price: game.spreads_exist ? game.away_spread_price > 0 ? `+${game.away_spread_price}` : game.away_spread_price : "",
			moneyline: game.moneylines_exist ? `${game.away_moneyline_price > 0 ? `+${game.away_moneyline_price}` : game.away_moneyline_price}` : '-',
			// totals: game.totals_exist ? `O${game.over_point} ${game.over_price > 0 ? `+${game.over_price}` : game.over_price}` : "-",
			totals_point: game.totals_exist ? `O${game.over_point}` : "-",
			totals_price: game.totals_exist ? game.over_price > 0 ? `+${game.over_price}` : game.over_price : ""
		},
		{
			name: game.home_team,
			// spread: game.spreads_exist ? `${game.home_spread_point > 0 ? `+${game.home_spread_point}` : game.home_spread_point} ${game.home_spread_price > 0 ? `+${game.home_spread_point}` : game.home_spread_price}` : "-",
			spread_point: game.spreads_exist ? game.home_spread_point > 0 ? `+${game.home_spread_point}` : game.home_spread_point : "-",
			spread_price: game.spreads_exist ? game.home_spread_price > 0 ? `+${game.home_spread_price}` : game.home_spread_price : "",
			moneyline: game.moneylines_exist ? `${game.home_moneyline_price > 0 ? `+${game.home_moneyline_price}` : game.home_moneyline_price}` : '-',
			// totals: game.totals_exist ? `U${game.under_point} ${game.under_price > 0 ? `+${game.under_price}` : game.under_price}` : "-",
			totals_point: game.totals_exist ? `U${game.under_point}` : "-",
			totals_price: game.totals_exist ? game.under_price > 0 ? `+${game.under_price}` : game.under_price : "",
		},
	]

	if (sportTitle)

		return (
			<Grid item xs={12} key={game.id} className={"bet-table"} >
				<Table>
					{
						!raw &&
						<caption  >
							<Box sx={{ display: 'flex', justifyContent: "space-between", width: '100%' }} >
								{startTime}
								<Link to={`/game/${game.id}`} style={{ fontWeight: 'bold', textDecoration: 'none', color: "#2c90ff", fontSize: '12px' }}  >More Wagers</Link>
							</Box>
						</caption>
					}

					<TableBody>
						{
							tableData.map(row =>
								<Grid container sx={{ padding: '0.3em' }} >
									<Grid item xs={6}>
										<Box className="bet-team-name">
											<Typography color="primary" variant="body2" sx={{ fontWeight: 'bold', padding: '0 1em' }} >{row.name}</Typography>
										</Box>
									</Grid>

									<Grid item xs={2}>
										<Box className={`${game.spreads_exist ? 'bet-option-active' : "bet-option-inactive"}`}>
											<Typography variant="body2" style={{ fontSize: "12px" }} >{row.spread_point}</Typography>
											<Typography variant="body2" style={{ fontSize: '12px', color: '#444' }} >{row.spread_price}</Typography>

										</Box>
									</Grid>
									<Grid item xs={2}>
										<Box className={`${game.moneylines_exist ? 'bet-option-active' : "bet-option-inactive"}`}>
											<Typography variant="body2" style={{ fontSize: "12px" }} >{row.moneyline}</Typography>
										</Box>
									</Grid>
									<Grid item xs={2}>
										<Box className={`${game.totals_exist ? 'bet-option-active' : "bet-option-inactive"}`}>
											<Typography variant="body2" style={{ fontSize: "12px" }} >{row.totals_point}</Typography>
											<Typography variant="body2" style={{ fontSize: '12px', color: '#444' }} >{row.totals_price}</Typography>
										</Box >
									</Grid>

								</Grid>
							)
						}

					</TableBody>
				</Table>

				{
					!raw &&
					<Box sx={{ width: '100%', height: 0, borderBottom: '1px solid #333' }} />
				}

			</Grid >
		)

}

