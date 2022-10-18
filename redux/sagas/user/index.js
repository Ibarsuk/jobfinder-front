import { all, call, put, getContext, takeLatest, select } from 'redux-saga/effects';

import apiRoutes from 'utils/apiRoutes';
import { getRefreshToken, logout, auth } from 'redux/stores/user';
import { redirect } from 'redux/globalActions';
import routes from 'utils/routes';
import Adapter from 'utils/Adapter';
import { failRequest, startRequest, successRequest } from 'redux/stores/requests';
import Requests from 'redux/stores/requests/Requests';
import { Action } from './actions';

function* authSaga(action) {
	const api = yield getContext('api');
	yield put(startRequest(Requests.auth));
	try {
		const res = yield call(api.post, apiRoutes.users.login, action.payload);
		res.data.user = Adapter.adaptUserToClient(res.data.user);
		yield all([put(successRequest(Requests.auth)), put(auth(res.data)), put(redirect(routes.home))]);
	} catch (e) {
		yield put(failRequest({ request: Requests.auth, error: e.response.data.message }));
	}
}

function* createUserSaga(action) {
	const api = yield getContext('api');
	yield put(startRequest(Requests.createUser));
	try {
		yield call(api.post, apiRoutes.users.index, Adapter.adaptUserToServer(action.payload));
		yield all([
			put(successRequest(Requests.createUser)),
			put(redirect({ pathname: routes.auth.index, query: { email: action.payload.email } })),
		]);
	} catch (e) {
		yield put(failRequest({ request: Requests.createUser, error: e.response?.data.message || e.message }));
	}
}

function* logoutSaga() {
	const api = yield getContext('api');
	const refresh = yield select(getRefreshToken);
	try {
		yield put(logout());
		yield call(api.post, apiRoutes.users.logout, { token: refresh });
		// eslint-disable-next-line no-empty
	} catch {}
}

function* userSaga() {
	yield all([
		takeLatest(Action.AUTH, authSaga),
		takeLatest(Action.LOGOUT, logoutSaga),
		takeLatest(Action.CREATE_USER, createUserSaga),
	]);
}

export default userSaga;
