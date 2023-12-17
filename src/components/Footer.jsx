// import { Box, Typography, Grid } from '@mui/material'
import Link from 'next/link'
import WordLogo from './WordLogo'

const Footer = () => {
	return (
		<div className="footer-container ">
			<div className="grid grid-cols- md:grid-cols-3 gap-4">

				<div className="">
					<Link href="/dashboard" passHref>
						<div className="cursor-pointer no-underline ">
							<div className="footer-grid-item">
								<WordLogo />
							</div>
						</div>
					</Link>
				</div>

				<div className="">
					<div className="footer-grid-item">
						<h6 className="font-bold">BETTING</h6>
						<div className="my-2 cursor-pointer">
							<Link href="/terms" passHref>
								<p className="text-sm text-gray-500 no-underline ">Terms of Services</p>
							</Link>
						</div>
						<div className="my-2 cursor-pointer">
							<Link href="/privacy" passHref>
								<p className="text-sm text-gray-500 no-underline ">Privacy Policy</p>
							</Link>
						</div>
					</div>
				</div>

				<div className="">
					<div className="footer-grid-item">
						<h6 className="font-bold">HELP</h6>
						<p className="my-2 text-sm text-gray-500">contact@lemondrop.bet</p>
						<p className="my-2 text-sm text-gray-500">1-800-GAMBLER</p>
					</div>
				</div>
			</div>

			<div className="mt-4">
				<p className="text-gray-500 mb-1">&copy; 2023 LEMONDROP</p>
				<p className="text-gray-500">
					Lemondrop and related trademarks are used under license. All Rights Reserved. Certain content reproduced under license.
				</p>
			</div>
		</div>
	)
}

export default Footer