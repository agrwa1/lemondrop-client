import React, { useEffect, useState } from 'react'
import axios from 'axios'

import GamePage from './games/GamesPage'
import ProfilePage from './profile/ProfilePage'
import DashboardPage from './dashboard/DashboardPage'
import BetPage from './bet/BetPage'
import LoginPage from './login/LoginPage'
import SignupPage from './signup/SignupPage'
import WheelPage from './wheel/WheelPage'
import AllSportsPage from './sports/AllSportsPage'
import SingleSportPage from './sports/SingleSportPage'
import LandingPage from './landing/LandingPage'
import PicksPage from './picks/PicksPage'
import TermsServicesPage from './misc/TermsServicesPage'
import PrivacyPolicyPage from './misc/PrivacyPolicyPage'
import CheckoutPage from './checkout/CheckoutPage'

import Error404 from './errors/Error404'

import { createTheme, ThemeProvider }
  from '@mui/material/styles';

import { orange, lime, purple, deepPurple, yellow, red } from '@mui/material/colors';
import { useNavigate, Navigate } from 'react-router-dom'

import { getAuth } from './auth/authFunctions'

import "./index.css"
import './picks.css'
import "./betslip.css"
import "./dashboard.css"
import "./gamecard2.css"
import "./gamecard1.css"
import "./sports-leagues.css"
import "./landing.css"
import "./terms.css"
import './footer.css'

import {
  BrowserRouter,
  Route,
  Routes,
  redirect
} from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Inter"
    ].join(','),
    fontWeight: 'bold',
    h1: {
      fontSize: 48,
      fontWeight: 'bold'
    },
    h2: {
      fontSize: 42
    },
    h3: {
      fontSize: 36
    },
    h4: {
      fontSize: 30
    },
    h5: {
      fontSize: 26
    },
    h6: {
      fontSize: 20
    }
  },
  palette: {
    primary: {
      // main: "#5b40f6"
      main: "#ffff00"
    },
    secondary: {
      main: "#138001"
    },
    mode: 'dark',
    dark: "#0A0A0A",
    background: {
      default: "#0A0A0A"
    }
    // mode: 'dark', 
  }
});

const AuthContext = React.createContext(null)

export default function App() {
  // <Route path="/wheel" element={<WheelPage />} />
  return (
    <AuthProvider >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* PROTECTED ROUTES */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />

            <Route path="/games/:league" element={
              <ProtectedRoute>
                <GamePage pathname={window.location.pathname} />
              </ProtectedRoute>
            } />

            {/* <Route path="/picks/:league" element={
              <ProtectedRoute>
                <PicksPage pathname={window.location.pathname} />
              </ProtectedRoute>
            } /> */}

            <Route path="/games/:league/:game" element={
              <ProtectedRoute>
                <BetPage />
              </ProtectedRoute>
            } />

            {/* <Route path="/game/:game" element={
              <ProtectedRoute>
                <BetPage />
              </ProtectedRoute>
            } /> */}


            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />

            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />

            <Route path="/leagues/all" element={
              <ProtectedRoute>
                <AllSportsPage />
              </ProtectedRoute>
            } />

            {/* <Route path="/sports/:sport" element={
              <ProtectedRoute>
                <SingleSportPage />
              </ProtectedRoute>
            } /> */}

            {/* PUBLIC ROUTES */}
            {/* 
             TO ADD:
              - Current odds page: unprotected
               
            */}
            <Route path="/*" element={<Error404 />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/waitlist" element={<LandingPage />} />
            <Route path="/terms" element={<TermsServicesPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>

  );
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  // const [token, setToken] = React.useState();
  const [token, setToken] = React.useState(localStorage.getItem('jwt'));
  const [user, setUser] = React.useState({})
  // getAuth().then(r => console.log(r))
  // console.log(getAuth())

  useEffect(() => {
    getAuth().then(r => {
      setUser(r.data)
    })
  }, [token])

  const update = () => {
    setToken(localStorage.getItem('jwt'));
    setUser(getAuth())
  }

  const signOut = () => {
    localStorage.removeItem('jwt')
    setToken("")
    getAuth().then(r => {
      setUser(r.data)
    })
  }

  const value = {
    token,
    user,
    setToken,
    update,
    signOut,
    setUser
  }

  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  )
}

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  // const navigate = useNavigate()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
