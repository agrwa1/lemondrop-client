const gamesParser = (game) => {
	const homeTeam = game.home_team;
	const awayTeam = game.away_team;

	const bookmakers = game.bookmakers;
	const marketPrices = {
		h2h: [],
		spread: [],
		totals: [],
	};

	// add market prices for each bookmaker
	bookmakers.forEach((bookMaker) => {
		const markets = bookMaker.markets;
		markets.forEach((market) => {
			switch (market.key) {
				case 'h2h':
					marketPrices['h2h'].push({
						outcomes: market.outcomes,
						lastUpdate: market.last_update,
					});
				case 'spread':
					marketPrices['spread'].push({
						outcomes: market.outcomes,
						lastUpdate: market.last_update,
					});
				case 'totals':
					marketPrices['totals'].push({
						outcomes: market.outcomes,
						lastUpdate: market.last_update,
					});
			}
		});
	});

	// add handling for if a market doesnt exist

	// find most recently updated market
	const h2hOutcomes = getMostRecentlyUpdatedOutcomes(marketPrices.h2h);
	const spreadOutcomes = getMostRecentlyUpdatedOutcomes(marketPrices.spread);
	const totalOutcomes = getMostRecentlyUpdatedOutcomes(marketPrices.totals);

	const h2hHome =
		h2hOutcomes[0].name == homeTeam
			? h2hOutcomes[0].price
			: h2hOutcomes[1].price;
	const h2hAway =
		h2hOutcomes[0].name == awayTeam
			? h2hOutcomes[0].price
			: h2hOutcomes[1].price;

	const spreadHome =
		spreadOutcomes[0].name == homeTeam
			? spreadOutcomes[0].point
			: spreadOutcomes[1].point;
	const spreadAway =
		spreadOutcomes[0].name == awayTeam
			? spreadOutcomes[0].point
			: spreadOutcomes[1].point;

	const spreadHomePrice =
		spreadOutcomes[0].name == homeTeam
			? spreadOutcomes[0].price
			: spreadOutcomes[1].price;
	const spreadAwayPrice =
		spreadOutcomes[0].name == awayTeam
			? spreadOutcomes[0].price
			: spreadOutcomes[1].price;

	const over = totalOutcomes[0].point;
	const overPrice = totalOutcomes[0].price;

	const under = totalOutcomes[1].point;
	const underPrice = totalOutcomes[1].price;

	return {
		home: homeTeam,
		away: awayTeam,
		commence_time: game.commence_time,
		completed: game.completed,
		id: game.id,
		last_update: game.last_update,
		scores: game.scores,
		sport_key: game.sport_key,
		sport_title: game.sport_title,
		h2h_home: h2hHome,
		h2h_away: h2hAway,
		spread_home: spreadHome,
		spread_away: spreadAway,
		spread_home_price: spreadHomePrice,
		spread_away_price: spreadAwayPrice,
		over: over,
		over_price: overPrice,
		under: under,
		under_price: underPrice,
	};
};

const getMostRecentlyUpdatedOutcomes = (market) => {
	// market is array of [outcomes, last_update]

	let mostRecentUpdate = new Date(1504095567183);
	let currentOutcome = [];

	market.forEach((pair) => {
		if (pair.lastUpdate >= mostRecentUpdate) {
			currentOutcome = pair.outcomes;
		}
	});

	return currentOutcome;
};

export default gamesParser;
