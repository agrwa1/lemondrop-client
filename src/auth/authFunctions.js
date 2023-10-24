import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export const getAuth = () => {
	const jwt = localStorage.getItem('jwt');
	// console.log(jwt);

	if (jwt) {
		const config = {
			headers: {
				'Bearer-Token': jwt,
			},
		};

		return axios.post('http://localhost:8080/api/users/login', {}, config);
		// .then((res) => {
		// 	// console.log('this is auth', res.data);
		// 	res.data;
		// });
	} else {
		console.log('no jwt');
		return new Promise((resolve, reject) => {
			resolve({});
		});
	}
};
