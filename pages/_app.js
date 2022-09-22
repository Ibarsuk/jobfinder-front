import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { initState } from 'redux/stores/user';
import LocalStorage from 'utils/localStorage';

import '../styles/global.sass';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const tokens = LocalStorage.read(`tokens`);
		const user = LocalStorage.read(`user`);
		store.dispatch(initState({ tokens, user }));
	}, []);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
