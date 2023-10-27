import React, { useState } from 'react'
import axios from 'axios'
import Header from '../layout/Header'
import { Box, Typography, Grid, Button, TextField, Checkbox, CircularProgress, LinearProgress, FormControl } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuth } from '../App'
import { CssBaseline } from '@mui/material'

const Signup = () => {
	const { update } = useAuth()
	const navigate = useNavigate()
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [agePassed, setAgePassed] = useState(false)
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(true)

	const verifyInfoAndSubmit = () => {
		// verify user info
		if (!firstName || !lastName || !password) {
			setError("Please fill all fields correctly")
			return
		}
		const regex = new RegExp(/^\S+@\S+\.\S+$/)
		if (!regex.test(email)) {
			setError("Please enter valid email: ")
			return
		}
		const phoneRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
		if (!phoneRegex.test(phoneNumber)) {
			setError("Please enter valid phone number")
			return
		}


		// if (!agePassed) {
		// 	setError("Please sign up when you are over 21 years old")
		// 	return
		// }

		// create request

		setError("")
		setLoading(true)
		axios.post("https://lemondrop-api.onrender.com/api/users/signup", {
			"first_name": firstName,
			"last_name": lastName,
			"email": email,
			"password": password,
			"phone_number": phoneNumber
		}).then(res => {
			console.log(res)
			const jwt = res.data
			localStorage.setItem("jwt", jwt)
			console.log(localStorage.getItem("jwt"))
			setLoading(false)
			update()
			navigate("/dashboard")
		}).catch(err => { console.log(err) })


		// on success -> redirect to dashboard

		// on failure -> display error message
	}

	return (
		<Box sx={{ height: '100vh', justifyContent: "center", alignItems: "center", display: 'flex', }} >
			<CssBaseline />

			<form>

				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '5em 3em', border: '1px solid #949494', borderRadius: '15px' }} >
					{
						loading &&
						<CircularProgress />
					}
					<Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontFamily: "Lobster", fontSize: '2em' }}>lemondrop</Typography>
					<Box sx={{ marginBottom: '2em' }} />

					<Typography variant='h5' sx={{ fontWeight: "bold" }} >Your New <Typography variant="h5" sx={{ color: "primary.main", fontWeight: 'bold', display: 'inline' }} >Sportsbook</Typography></Typography>
					<Box sx={{ marginBottom: '1.5em' }} />

					<Box sx={{ margin: "0 10em" }} />
					<Typography variant="body1" sx={{ color: 'gray' }} >Enter your credentials to signup</Typography>
					<Typography variant="body1" sx={{ color: 'red', fontWeight: 'bold' }} >{error}</Typography>
					<Box sx={{ marginBottom: '3em' }} />

					<FormControl>

						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1em", gap: '10px' }}>
							<TextField label="First Name" onChange={e => setFirstName(e.target.value)} variant="outlined" />
							<TextField label="Last Name" onChange={e => setLastName(e.target.value)} variant="outlined" />
						</Box>



						<TextField fullWidth label="Phone Number" variant="outlined" onChange={e => setPhoneNumber(e.target.value)} />
						<Box sx={{ marginBottom: '1em' }} />

						<TextField fullWidth label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} />
						<Box sx={{ marginBottom: '1em' }} />

						<TextField fullWidth label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
						<Box sx={{ marginBottom: '1em' }} />

						<Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '2em' }} >
							<Checkbox />
							<Typography variant="body2" onClick={e => setAgePassed(!agePassed)} >I confirm I am 21 years or older</Typography>
						</Box>

					</FormControl>




					{/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '1em 0' }} >
					<Box sx={{ display: 'flex', alignItems: 'center' }} >
					<Checkbox />
					<Typography variant="body2">Remember Me</Typography>
					</Box>
					<Typography variant="body2">Forgot Password?</Typography>
				</Box> */}


					<Button variant="contained" fullWidth onClick={verifyInfoAndSubmit} >Sign Up</Button>

					<Box sx={{ marginTop: '1em' }} />

					<Box sx={{ display: 'flex', justifyContent: 'start', width: '100%' }} >
						<Link to="/login"> <Typography variant="body2">Already a User? Login</Typography> </Link>
					</Box>


				</Box>

			</form>

		</Box>
	)
}

export default Signup  
