import { all, call, put, getContext, takeLatest } from 'redux-saga/effects';

import apiRoutes from 'utils/apiRoutes';
import { startAuth, successAuth, failAuth } from 'redux/stores/user';
import LocalStorage from 'utils/localStorage';
import { AsyncAction, redirect } from 'redux/actions';
import routes from 'utils/routes';

function* authSaga(action) {
	const api = yield getContext('api');
	yield put(startAuth());
	try {
		const res = yield call(api.post, apiRoutes.users.login, action.payload);
		LocalStorage.write(`tokens`, res.data.tokens);
		LocalStorage.write(`user`, res.data.user);

		yield put(successAuth(res.data));
		yield put(redirect(routes.home));
	} catch (e) {
		yield put(failAuth(e.response.data.message));
	}
}

function* userSaga() {
	yield all([takeLatest(AsyncAction.AUTH, authSaga)]);
}

export default userSaga;
