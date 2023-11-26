import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export const getAuth = () => {
	const jwt = localStorage.getItem('jwt');
	// console.log('jwt: ', jwt);

	if (jwt) {
		const config = {
			headers: {
				'Bearer-Token': jwt,
			},
		};

		// console.log(jwt);

		return axios
			.post(
				'https://lemondrop-api.onrender.com/api/users/login',
				// 'http://localhost:8080/api/users/login',
				{},
				config
			)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				console.log('invalid jwt');
				return new Promise((resolve, reject) => {
					resolve({});
				});
			});
	} else {
		console.log('no jwt');
		return new Promise((resolve, reject) => {
			resolve({});
		});
	}
};
