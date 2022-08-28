import { Provider } from 'react-redux';
import store from 'redux/store';

import '../styles/global.sass';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
