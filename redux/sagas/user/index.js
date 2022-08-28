import { all, call, put, getContext, takeLatest } from 'redux-saga/effects';

import apiRoutes from 'utils/apiRoutes';
import { addToken } from 'redux/stores/user';
import Action from './actions';

function* authSaga(action) {
	const api = yield getContext('api');
	try {
		const res = yield call(api.post(apiRoutes.auth, action.payload));
		yield put(addToken(res.data));
	} catch (e) {
		// not finished!!
		yield put(addToken(null));
	}
}

function* userSaga() {
	yield all([takeLatest(Action.AUTH, authSaga)]);
}

export default userSaga;
