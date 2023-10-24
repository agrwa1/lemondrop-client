import React, { useEffect, useState } from 'react'
import Layout from '../layout'
import { Typography } from '@mui/material'
import Dashboard from './Dashboard'
import { getAuth } from '../auth/authFunctions'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'

const DashboardPage = () => {
	return (
		<Layout>
			<Dashboard />
		</Layout>
	)
}

export default DashboardPage