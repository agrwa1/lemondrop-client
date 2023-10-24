import React, { useState, useEffect } from 'react'

import Header from '../layout/Header'
import { Box, Typography, Grid, Button, TextField, Checkbox } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getAuth } from '../auth/authFunctions'
import { useAuth } from '../App'

import { useNavigate } from 'react-router-dom'

const Login = () => {
	const { user, token, update } = useAuth()
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const submit = () => {
		setError("")
		if (!email || !password) {
			setError("Please enter all fields correctly")
		}
		const regex = new RegExp(/^\S+@\S+\.\S+$/)
		if (!regex.test(email)) {
			setError("Please enter valid email: ")
			return
		}

		axios.post("http://localhost:8080/api/users/login", {
			email: email,
			password: password,
		}).then(res => {
			console.log(res)
			localStorage.setItem("jwt", res.data.jwt)
			console.log(localStorage.getItem("jwt"))
			update()
			navigate("/dashboard")
		}).catch(err => {
			setError("Invalid credentials. Please try again")
		})

	}
	useEffect(() => {
		// const user = getAuth()
		// const { user } = { user: null }
		// const { token } = useAuth()
		// const token = null
		if (token !== null) {
			// console.log(user)
			navigate("/dashboard")
		}
	}, [])

	return (
		<Box sx={{ height: '100vh', justifyContent: "center", alignItems: "center", display: 'flex', backgroundColor: '#FFF4F2' }} >
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '5em 3em', border: '1px solid white', backgroundColor: 'white', borderRadius: '15px' }} >
				<Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontFamily: "Lobster", fontSize: '2em' }}>Lemondrop</Typography>
				<Box sx={{ marginBottom: '2em' }} />


				<Typography variant='h5' sx={{ fontWeight: "bold" }} >Hi, Welcome Back</Typography>
				<Box sx={{ marginBottom: '2em' }} />

				{/* 
				<Typography variant="body1" sx={{ color: "gray" }}>Enter your credentials </Typography>
				<Box sx={{ marginBottom: '2em' }} />
				<Button variant="contained" size="large" sx={{ padding: "0.5em 4em" }} >Sign in with Google to continue</Button>
				<Box sx={{ marginBottom: '2em' }} />

				<Typography variant="body1"  >or</Typography>
				<Box sx={{ marginBottom: '2em' }} /> */}

				<Box sx={{ margin: "0 10em" }} />

				<Typography variant="body1" sx={{ color: 'gray' }} >Sign in with your Email</Typography>
				<Typography variant="body2" sx={{ color: 'red' }} >{error}</Typography>
				<Box sx={{ marginBottom: '3em' }} />


				<TextField fullWidth label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} />
				<Box sx={{ marginBottom: '1em' }} />

				<TextField fullWidth label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
				<Box sx={{ marginBottom: '1em' }} />

				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '1em 0' }} >
					<Box sx={{ display: 'flex', alignItems: 'center' }} >
						<Checkbox />
						<Typography variant="body2">Remember Me</Typography>
					</Box>
					<Typography variant="body2">Forgot Password?</Typography>
				</Box>


				<Button variant="contained" fullWidth onClick={submit} >Log in</Button>

				<Box sx={{ marginTop: '1em' }} />

				<Box sx={{ display: 'flex', justifyContent: 'start', width: '100%' }} >
					<Link to="/signup"> <Typography variant="body2">New Here? Sign up</Typography> </Link>
				</Box>


			</Box>


		</Box>
	)
}

export default Login
