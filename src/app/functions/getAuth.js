export default function getAuth() {
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

	let res = fetch('https://lemondrop-api.onrender.com/api/users/login', {
		method: 'POST',
		headers: config.headers,
	}).then((x) => x.json());
	// .catch((e) => {});

	// let res = fetch('http://localhost:8080/api/users/login', {
	// 	method: "POST",
	// 	headers: {
	// 		'Bearer-Token': jwt,
	// 	},
	// }).then(x => x.json())
	// res.then(data => console.log(data))

	return res;
}
