

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
import { AuthContextProvider } from "./context/auth.context";
import Head from 'next/head'

import { Roboto, Inter } from '@next/font/google'

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '700']
})
const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: "--font-roboto"
})


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
			<body className={`${roboto.className} min-h-screen bg-dark text-white f`} >
				<AuthContextProvider>
					<CounterContextProvider >
						<div id="root">
							{children}
						</div>
					</CounterContextProvider>
				</AuthContextProvider>
			</body>
		</html>
	)
}