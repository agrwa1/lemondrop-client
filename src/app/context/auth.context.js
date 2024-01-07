'use client';

import React, { createContext, useReducer, useState } from 'react';

const initialState = {
	user: {},
};

const reducer = (state, action) => {
	// console.log('reducing');
	if (action.type == 'logout') {
		localStorage.setItem('jwt', '');
		return new Promise((resolve) => {
			resolve({ user: {} });
		});
	}

	// if (window.location == 'undefined') {
	// 	return new Promise((resolve, reject) => {
	// 		resolve({ user: {} });
	// 	});
	// }

	const jwt = localStorage.getItem('jwt');
	if (!jwt) {
		return new Promise((resolve, reject) => {
			resolve({});
		});
	}
	const config = {
		headers: {
			'Bearer-Token': jwt,
		},
	};

	return new Promise((resolve) => {
		resolve({
			user: fetch('https://lemondrop-api.onrender.com/api/users/login', {
				method: 'POST',
				headers: config.headers,
			}).then((x) => x.json()),
		});
	});
};

const useAsyncReducer = (reducer, initialState = null) => {
	const [state, setState] = useState(initialState);

	const dispatch = async (action) => {
		const result = reducer(state, action);
		if (typeof result.then === 'function') {
			try {
				const newState = await result;
				setState(newState);
			} catch (err) {
				setState({ error: err });
			}
		} else {
			setState(result);
		}
	};

	return [state, dispatch];
};

function createActions(dispatch) {
	return {
		logout: () => dispatch({ type: 'logout' }),
	};
}

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useAsyncReducer(reducer, initialState);
	const actions = createActions(dispatch);

	return (
		<AuthContext.Provider value={[state, actions]}>
			{children}
		</AuthContext.Provider>
	);
};
