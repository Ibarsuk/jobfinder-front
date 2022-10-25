import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import api from 'utils/axios';
import localStorageMiddleware from './middlewares/localStorageMiddleware';
import redirectMiddleware from './middlewares/redirectMiddleware';
import rootSaga from './sagas/root-saga';
import reducer from './stores/rootReducer';

const sagaMiddleware = createSagaMiddleware({
	context: {
		api,
	},
});

const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ thunk: false, serializableCheck: false })
			.concat(sagaMiddleware)
			.concat(redirectMiddleware)
			.concat(localStorageMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
