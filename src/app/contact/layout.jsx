import Layout from '../(layout)/index'

export const metadata = {
	title: 'Contact Lemondrop',
	description: 'This is Lemondrop Sportsbook. Premier Sports Betting Online Casino 18+. The Ball Is In Your Hands with Lemondrop Sportsbook.',
}

export default function PageLayout({ children }) {
	return (
		<Layout>
			{children}
		</Layout>
	)
}