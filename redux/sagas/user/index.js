import { all, call, put, getContext, takeLatest, select } from 'redux-saga/effects';

import apiRoutes from 'utils/apiRoutes';
import { startAuth, successAuth, failAuth, getRefreshToken, logout } from 'redux/stores/user';
import LocalStorage from 'utils/localStorage';
import { redirect } from 'redux/globalActions';
import routes from 'utils/routes';
import Adapter from 'utils/Adapter';
import { Action } from './actions';

function* authSaga(action) {
	const api = yield getContext('api');
	yield put(startAuth());
	try {
		const res = yield call(api.post, apiRoutes.users.login, action.payload);
		res.data.user = Adapter.adaptUserToClient(res.data.user);
		LocalStorage.write(`tokens`, res.data.tokens);
		LocalStorage.write(`user`, res.data.user);
		yield all([put(successAuth(res.data)), put(redirect(routes.home))]);
	} catch (e) {
		yield put(failAuth(e.response.data.message));
	}
}

function* logoutSaga() {
	const api = yield getContext('api');
	const refresh = yield select(getRefreshToken);
	LocalStorage.remove(`tokens`);
	LocalStorage.remove(`user`);
	try {
		yield put(logout());
		yield call(api.post, apiRoutes.users.logout, { token: refresh });
		// eslint-disable-next-line no-empty
	} catch {}
}

function* userSaga() {
	yield all([takeLatest(Action.AUTH, authSaga), takeLatest(Action.LOGOUT, logoutSaga)]);
}

export default userSaga;
