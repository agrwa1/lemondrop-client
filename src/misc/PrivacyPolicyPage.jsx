import React from 'react'

import { Box, Typography, CssBaseline } from '@mui/material'
import { Link } from 'react-router-dom'
import Footer from '../layout/Footer'

const PrivacyPolicyPage = () => {
	return (
		<Box className="terms-container">
			<CssBaseline />
			<nav >
				<Link to="/" style={{ textDecoration: 'none' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', textDecoration: "none" }}>
						<Typography variant="h6" sx={{ color: '#5b40f6', fontFamily: "lobster", fontSize: '36px' }}>lemondrop</Typography>
						<Typography variant="h6" sx={{ fontSize: '20px', color: 'black' }}>SPORTSBOOK</Typography>
					</Box>
				</Link>
			</nav>

			<Typography variant="h1" className="tos-header" sx={{ margin: '2em 0' }}>
				Privacy Policy for Lemondrop
			</Typography>

			<Typography variant="body1" className="tos-last-updated" sx={{ marginBottom: '1em' }}>
				Last Updated: November 24, 2023
			</Typography>

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				At Lemondrop, we understand the importance of privacy and are committed to protecting the personal information of our users. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our services. By accessing or using Lemondrop, you agree to the terms outlined in this Privacy Policy. Please take a moment to review our practices, and if you have any questions or concerns, feel free to contact us at privacy@lemondrop.bet.
			</Typography>


			<Typography variant="h5" className="tos-section-header" sx={{ marginBottom: "1em" }}>
				1. Information We Collect:
			</Typography>

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '0.5em' }}>
				a. Personal Information:
				When you register for a Lemondrop account, we collect information such as your name, email address, date of birth, and other details necessary for account creation.
			</Typography>
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '0.5em' }}>
				b. Transaction Information:
				To facilitate deposits and withdrawals, we collect transaction details, including payment method information.
			</Typography>
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '0.5em' }}>
				c. Usage Information:
				We gather data on how you interact with Lemondrop, such as the games you play, bets you place, and pages you visit.
			</Typography>
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				d. Device Information:
				Information about the device you use to access Lemondrop, including device type, operating system, and browser type, is collected to enhance your user experience.
			</Typography>

			<Typography variant="h5" className="tos-section-header" sx={{ marginBottom: "1em" }}>
				2. How We Use Your Information:
			</Typography>
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '0.5em' }}>
				a. Account Management:
				We use your personal information to manage and maintain your Lemondrop account, including account verification and security.
			</Typography>

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '0.5em' }}>
				b. Transactions:
				Transaction information is used to process payments, withdrawals, and to prevent fraudulent activities.
			</Typography>

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '0.5em' }}>
				c. Improving User Experience:
				Usage and device information help us understand how you interact with Lemondrop, enabling us to enhance our platform and tailor our services to your preferences.
			</Typography>

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				d. Customer Support:
				When you reach out to our customer support, we use the information provided to assist you and address your inquiries.
			</Typography>

			<Typography variant="h5" className="tos-section-header" sx={{ marginBottom: "1em" }}>
				3. Information Sharing:
			</Typography>

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '0.5em' }}>
				a. Third-Party Service Providers:
				We may share information with trusted third-party service providers to assist us in delivering our services, such as payment processors and customer support platforms.
			</Typography>

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				b. Legal Requirements:
				We may disclose your information in response to legal requests, such as court orders or government investigations, to comply with applicable laws and regulations.
			</Typography>

			<Typography variant="h5" className="tos-section-header" sx={{ marginBottom: "1em" }}>
				4. Security Measures:
			</Typography>
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				Lemondrop employs industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
			</Typography>

			<Typography variant="h5" className="tos-section-header" sx={{ marginBottom: "1em" }}>
				5. Your Choices:
			</Typography>

			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				You have the right to access, correct, or delete your personal information. You can manage your communication preferences and opt-out of promotional emails by contacting us at privacy@lemondrop.bet.
			</Typography>

			<Typography variant="h5" className="tos-section-header" sx={{ marginBottom: "1em" }}>
				6. Updates to Privacy Policy:
			</Typography>
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				Lemondrop reserves the right to update this Privacy Policy at any time. We will notify you of any significant changes through our platform or other means. Continued use of our services after changes to the Privacy Policy constitutes acceptance of those changes.
			</Typography>

			<Typography variant="h5" className="tos-section-header" sx={{ marginBottom: "1em" }}>
				7. Contact Us:
			</Typography>
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '2em' }}>
				If you have any questions, concerns, or requests regarding your privacy or this Privacy Policy, please contact our privacy team at privacy@lemondrop.bet.
			</Typography>
			<Typography variant="body1" className="tos-p" sx={{ marginBottom: '0.5em' }}>
				Thank you for choosing Lemondrop! We are committed to providing a secure and enjoyable sports betting experience while respecting your privacy.
			</Typography>

			<Footer />
		</Box>

	)
}

export default PrivacyPolicyPage
