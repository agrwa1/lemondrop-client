import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export const getAuth = () => {
	const jwt = localStorage.getItem('jwt');

	if (jwt) {
		const config = {
			headers: {
				'Bearer-Token': jwt,
			},
		};

		return axios.post(
			'https://lemondrop-api.onrender.com/api/users/login',
			{},
			config
		);
	} else {
		console.log('no jwt');
		return new Promise((resolve, reject) => {
			resolve({});
		});
	}
};
