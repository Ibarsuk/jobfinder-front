import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import api from 'utils/axios';
import reducer from './stores/rootReducer';

const sagaMiddleware = createSagaMiddleware({
	context: {
		api,
	},
});

export default configureStore({
	reducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
