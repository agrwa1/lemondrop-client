import React from 'react'

import { Box, Typography, CssBaseline } from '@mui/material'
import { Link } from 'react-router-dom'
import Footer from '../layout/Footer'

const TermsServicesPage = () => {
	return (
		<Box className="terms-container">
			<CssBaseline />

			<nav >
				<Link to="/" style={{ textDecoration: 'none' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', textDecoration: "none" }}>
						<Typography variant="h6" sx={{ color: '#2c90ff', fontFamily: "lobster", fontSize: '36px' }}>lemondrop</Typography>
						<Typography variant="h6" sx={{ fontSize: '20px', color: 'black' }}>SPORTSBOOK</Typography>
					</Box>
				</Link>
			</nav>
			<Typography variant="h1" className="tos-header" sx={{ margin: '2em 0' }}>
				Terms of Service for Lemondrop
			</Typography>

			<Typography variant="body1" className="tos-last-updated" sx={{ marginBottom: '2em' }}>
				Last Updated: November 24, 2023

			</Typography>

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				Greetings and welcome to Lemondrop, your ultimate destination for an exhilarating sports betting experience. We understand the importance of clarity and transparency in providing you with the best possible service. Before you immerse yourself in the thrill of our platform, we invite you to review our comprehensive Terms of Service ("Terms"). By accessing or using Lemondrop, you indicate your agreement to comply with and be bound by these Terms. If any part of these Terms is disagreeable to you, we kindly ask that you refrain from using our services.
			</Typography>

			<Typography variant="h5" className="tos-section-header">
				1. Acceptance of Terms:
			</Typography>
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				By accessing or using Lemondrop, you affirm that you have read, understood, and agree to be bound by these Terms. If you are utilizing our services on behalf of an organization, you assert that you possess the authority to bind that organization to these Terms.
			</Typography>

			<Typography variant="h5" className="tos-section-header">
				2. Eligibility:
			</Typography>

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				To enjoy the features of Lemondrop, you must be at least 18 years old or the legal age for gambling in your jurisdiction.It is imperative that you ensure your use of our services aligns with all applicable laws and regulations in your region.
			</Typography>

			< Typography variant="h5" className="tos-section-header" >
				3. Account Registration:
			</Typography >

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				Unlock exclusive features by creating a Lemondrop account.During the registration process, you commit to providing accurate, current, and complete information.It is your responsibility to update this information to ensure its accuracy, currency, and completeness.
			</Typography>

			< Typography variant="h5" className="tos-section-header" >
				4. User Conduct:
			</Typography >
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				Lemondrop encourages users to engage in lawful activities.You, as the account holder, are solely responsible for all activities occurring under your account.Prohibited activities include, but are not limited to, fraud, tampering, and the use of unauthorized automated systems.
			</Typography>

			< Typography variant="h5" className="tos-section-header" >
				5. Deposits and Withdrawals:
			</Typography >
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				To enhance your experience, Lemondrop provides a variety of methods for depositing and withdrawing funds.By utilizing our platform, you agree to adhere to the terms and conditions stipulated by your chosen payment method.All transactions are subject to review and may be refused at our discretion.
			</Typography>


			< Typography variant="h5" className="tos-section-header" >
				6. Responsible Gambling:
			</Typography >
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				At Lemondrop, we are committed to advocating for responsible gambling.If you find that your gambling activities are becoming problematic, we urge you to reach out to our support team for assistance.Our platform offers self - exclusion options and various responsible gaming tools designed to help you maintain control.
			</Typography>

			< Typography variant="h5" className="tos-section-header" >
				7. Intellectual Property:
			</Typography >
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				The content, design, and intellectual property featured on Lemondrop are either owned or licensed by us.Without our express written consent, you may not use, reproduce, distribute, or create derivative works based on this content.
			</Typography>


			< Typography variant="h5" className="tos-section-header" >
				8. Termination:
			</Typography >
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				Lemondrop reserves the right to terminate or suspend your account at any time and for any reason.This includes, but is not limited to, a violation of these Terms or applicable laws and regulations.
			</Typography>


			< Typography variant="h5" className="tos-section-header" >
				9. Disclaimer of Warranties:
			</Typography >
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				Lemondrop is provided "as is" without warranties of any kind, whether express or implied.We do not guarantee the accuracy, completeness, or reliability of any information on our platform.
			</Typography>

			< Typography variant="h5" className="tos-section-header" >
				10. Limitation of Liability:
			</Typography >
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				In no event shall Lemondrop be liable for any indirect, incidental, special, consequential, or punitive damages.This includes any loss of profits or revenues, whether incurred directly or indirectly.
			</Typography>

			< Typography variant="h5" className="tos-section-header" >
				11. Changes to Terms:
			</Typography >
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				Lemondrop reserves the right to modify these Terms at any time.Updated Terms will be posted on Lemondrop, and it is your responsibility to review them periodically.Continued use of our services after changes to the Terms constitutes acceptance of those changes.
			</Typography>

			< Typography variant="h5" className="tos-section-header" >
				12. Additional Resources:
			</Typography >
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				For further insights into our policies and procedures, we invite you to explore our Help Center at[link to Lemondrop Help Center].

				If you have any questions or concerns regarding these Terms, please contact our dedicated support team at help @lemondrop.bet.

				Thank you for choosing Lemondrop! Immerse yourself in the excitement of sports betting responsibly and enjoy the unparalleled experience we provide.
			</Typography>

			<Footer />

		</Box >
	)
}

export default TermsServicesPage
