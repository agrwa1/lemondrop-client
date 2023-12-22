'use client';

import React, { createContext, useReducer } from 'react';

const initialState = {
	count: 0,
	bets: [],
};

const reducer = (state, action) => {
	const defaultBetValue = 10;

	if (action.type === 'update') {
		const updatedBets = state.bets.map((b) => {
			if (
				b.betOnTeam === action.betOnTeam &&
				b.betType === action.betType &&
				b.gameId === action.gameId
			) {
				// Update the matching bet
				return {
					...b,
					amount: action.amount,
				};
			}
			return b;
		});

		return { bets: updatedBets };
	}

	const bet = {
		betOnTeam: action.betOnTeam,
		betType: action.betType,
		price: action.price,
		point: action.point,
		awayTeam: action.awayTeam,
		homeTeam: action.homeTeam,
		gameId: action.gameId,
		gameHash: action.gameHash,
		index: action.index,
		amount: defaultBetValue,
	};

	const betWasRemoved = state.bets.some(
		(b) =>
			b.betOnTeam === bet.betOnTeam &&
			b.betType === bet.betType &&
			b.gameId === bet.gameId
	);

	let newBets = [];
	if (betWasRemoved) {
		// remove bet
		state.bets.forEach((b) => {
			if (
				b.betOnTeam === bet.betOnTeam &&
				b.betType === bet.betType &&
				b.gameId === bet.gameId
			) {
				return;
			}
			newBets.push(b);
		});
	} else {
		state.bets.forEach((b) => {
			newBets.push(b);
		});
		newBets.push(bet);
	}

	console.log(newBets);

	return { bets: newBets };
};
// switch (action.type) {
// 	case 'INCREMENT':
// 		return { ...state, count: state.count + 1 };
// 	case 'DECREMENT':
// 		return { ...state, count: state.count - 1 };
// 	case 'RESET':
// 		return { ...state, count: 0 };
// 	case 'ADDBET':
// 		return { ...state };
// 	default:
// 		return state;
// }

export const CounterContext = createContext({
	state: initialState,
	dispatch: () => null,
});

export const CounterContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<CounterContext.Provider value={{ state, dispatch }}>
			{children}
		</CounterContext.Provider>
	);
};
