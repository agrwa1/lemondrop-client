// import React, { useState, useEffect } from 'react'
'use client'

import GC1 from './GameCard1'
import GC2 from './GameCard2'

export default function GameCard({ game, raw }) {
	if (game.draw_moneyline) {
		return (<div className="w-full">
			<GC2 game={game} raw={raw} />
		</div>)
	}
	return (<div className="w-full">
		<GC1 game={game} raw={raw} />
	</div>)



}

