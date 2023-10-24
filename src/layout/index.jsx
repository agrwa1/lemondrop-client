import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar';

import { getAuth } from '../auth/authFunctions';
import { useNavigate } from 'react-router-dom'

const Layout = ({ children }) => {
	// const navigate = useNavigate()
	// useEffect(() => {
	// 	const user = getAuth()
	// 	if (user === null) {
	// 		return navigate("/login")
	// 	} else {
	// 		return navigate("/")
	// 	}


	// })


	return <Sidebar>{children}</Sidebar>;
};

export default Layout;

/*
	- takes active link
	- passes children as props in main

*/
