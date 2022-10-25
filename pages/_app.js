import { useLayoutEffect } from 'react';
import { Provider } from 'react-redux';
import { initState } from 'redux/globalActions';
import store from 'redux/store';
import '../styles/global.sass';

function MyApp({ Component, pageProps }) {
	useLayoutEffect(() => {
		store.dispatch(initState());
	}, []);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
