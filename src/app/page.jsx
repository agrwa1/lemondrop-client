'use client'

import React, {useEffect} from 'react'
import {useRouter} from 'next/navigation'

import Header from './components/Header';
import ProLogos from './pro-logos.png'
import LandingForm from './LandingForm'

import getAuth from './functions/getAuth'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    getAuth().then(u => {
      if (Object.keys(u).length > 0 && u.email) {
        router.push("/leagues/all")
      }
    })
  }, []) 

	return (
		<main className="landing-main">

			<Header />

			<div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>
				<div className="firework"></div>

			</div>


			<div className="hero " >
				<div className="hero-left-container pr-4 xs:pr-0 ">
					<div className="hero-left">
						<h3 className="hero-main-topper">The Ball Is In Your Hands.</h3>
						<h1 className="hero-main-title">BET WITH LEMONDROP.</h1>
						<h2 className="hero-main-subtitle">Right Now, Lemondrop is Only Accepting Users with Referral Codes. So Find a Friend Who's In Or Join the Lemondrop Waitlist. Fill Out Your Email And We'll Let You Know When You're In.</h2>
						<div className="hero-email-list">
							{/* <TextField ref={inputRef} value={email} onChange={handleEmailChange} id="outlined-basic" sx={{ marginRight: '5em' }} label="Email" variant="outlined" className="hero-email-input" /> */}
							{/* <button onClick={handleSubmit} className="hero-email-submit" disabled={!emailValid || submitting} >Submit Now</button> */}
							<LandingForm />
						</div>
						{/* <Snackbar
							open={success}
							autoHideDuration={6000}
							onClose={() => setSuccess(false)}
							message="You're on the mailing list!"
						/>
						<Snackbar
							open={failure}
							autoHideDuration={6000}
							onClose={() => setFailure(false)}
							message="Something went wrong. Please try again."
						/> */}
					</div>

				</div>

				<div className="hero-right">
					<img src={ProLogos.src} className="hero-graphic-right" ></img>
				</div>
			</div>

		</main>
	)
}

