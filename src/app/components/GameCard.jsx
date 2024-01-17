// import React, { useState, useEffect } from 'react'
'use client'

import GC1 from './GameCard1'
import GC2 from './GameCard2'
import GC3 from './GameCard3'

export default function GameCard({ game, raw }) {
	console.log(game)
	if (game.draw_moneyline) {
		return (<div className="w-full">
			<GC2 game={game} raw={raw} />
		</div>)
	}
	if (game.league_id == "combatsports_ufc") {
		return (<div className="w-full">
			<GC3 game={game} raw={raw} />
		</div>)
	}
	return (<div className="w-full">
		<GC1 game={game} raw={raw} />
	</div>)



}

