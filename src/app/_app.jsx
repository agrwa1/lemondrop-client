// _app.jsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Import FastClick
import FastClick from 'fastclick';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		if ('addEventListener' in document) {
			document.addEventListener(
				'DOMContentLoaded',
				function () {
					// Attach FastClick to eliminate the 300ms delay on touch events
					FastClick.attach(document.body);
				},
				false
			);
		}

		// Attach FastClick to the document body after a route change
		const handleRouteChange = () => {
			if (window.FastClick) {
				window.FastClick.attach(document.body);
			}
		};

		router.events.on('routeChangeComplete', handleRouteChange);

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router]);

	return <Component {...pageProps} />;
}

export default MyApp;
