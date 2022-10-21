import { all, call, put, getContext, takeLatest } from 'redux-saga/effects';

import apiRoutes from 'utils/apiRoutes';
import { assignCurrentCandidate, setCandidates } from 'redux/stores/candidates';
import { failRequest, startRequest, successRequest } from 'redux/stores/requests';
import Requests from 'redux/stores/requests/Requests';
import routes from 'utils/routes';
import { redirect } from 'redux/globalActions';
import { getFormData } from 'utils/util';
import Action from './actions';

function* fetchCandidateSaga(action) {
	const api = yield getContext('api');
	try {
		const res = yield call(api.get, `${apiRoutes.candidates}/${action.payload}`);
		yield put(assignCurrentCandidate(res.data));
	} catch (e) {
		yield put(assignCurrentCandidate(null));
	}
}

function* fetchCandidatesSaga() {
	const api = yield getContext('api');
	yield put(startRequest(Requests.getCandidates));
	try {
		const res = yield call(api.get, `${apiRoutes.candidates}`);
		yield all([put(successRequest(Requests.getCandidates)), put(setCandidates(res.data))]);
	} catch (e) {
		yield put(failRequest({ request: Requests.getCandidates, error: e.response.data.message }));
	}
}

function* createCandidateSaga(action) {
	const api = yield getContext('api');
	yield put(startRequest(Requests.createCandidate));
	try {
		yield call(api.post, apiRoutes.candidates, getFormData(action.payload), {
			Headers: { 'Content-Type': 'multipart/form-data' },
		});
		yield all([put(successRequest(Requests.createCandidate)), put(redirect(routes.user.index))]);
	} catch (e) {
		yield put(failRequest({ request: Requests.createCandidate, error: e.response?.data.message || e.message }));
	}
}

function* candidatesSaga() {
	yield all([
		takeLatest(Action.FETCH_CANDIDATE, fetchCandidateSaga),
		takeLatest(Action.FETCH_CANDIDATES, fetchCandidatesSaga),
		takeLatest(Action.CREATE_CANDIDATE, createCandidateSaga),
	]);
}

export default candidatesSaga;
