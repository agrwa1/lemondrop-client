import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material'

const AllWheels = () => {
	const [wheels, setWheels] = useState([])

	useEffect(() => {
		axios.get("https://lemondrop-api.onrender.com/api/wheels/all").then(res => {
			setWheels(res.data)
			console.log(res.data)
		}).catch(e => console.log(e))
	}, [])


	return (
		<div>
			<Typography variant='h1'>All Wheels</Typography>
			{
				wheels.map(w => <Typography variant='h3'>{w.name}</Typography>)
			}
		</div>
	)
}

export default AllWheels
