

import './(css)/betslip.css'
import './(css)/dashboard.css'
import './(css)/footer.css'
import './(css)/gamecard1.css'
import './(css)/gamecard2.css'
import './(css)/index.css'
import './(css)/landing.css'
import './(css)/picks.css'
import './(css)/terms.css'
import './(css)/sports-leagues.css'

import { CounterContextProvider } from "./context/bets.context";
import Head from 'next/head'


export const metadata = {
	title: 'Lemondrop Sportsbook',
	description: 'This is Lemondrop Sportsbook. Premier Sports Betting Online Casino 18+. The Ball Is In Your Hands with Lemondrop Sportsbook.',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="box-border">
			<Head>
				<link rel="icon" href="/ld-logo-graphic-yellow.png" />
			</Head>
			<body className="min-h-screen bg-dark text-white font-sans" >
				<div id="root">
					<CounterContextProvider>
						{children}
					</CounterContextProvider>
				</div>
			</body>
		</html>
	)
}