
import 'fastclick';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		// Ensure FastClick is attached to the document body after a route change
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