import Layout from '../../(layout)/index'

export const metadata = {
	title: 'Lemondrop Games',
	description: 'This is Lemondrop Sportsbook. Premier Sports Betting Online Casino 18+. The Ball Is In Your Hands with Lemondrop Sportsbook.',
}

export default async function PageLayout({ children }) {
	return (
		<Layout>
			{children}
		</Layout>
	)
}

export async function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}


