import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import api from 'utils/axios';
import rootSaga from './sagas/root-saga';
import reducer from './stores/rootReducer';

const sagaMiddleware = createSagaMiddleware({
	context: {
		api,
	},
});

const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;