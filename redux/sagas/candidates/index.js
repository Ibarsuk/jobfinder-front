import { all, call, put, getContext, takeLatest } from 'redux-saga/effects';

import apiRoutes from 'utils/apiRoutes';
import { assignCandidates, assignCurrentCandidate } from 'redux/stores/candidates';
import Action from './actions';

function* fetchCandidateSaga(action) {
	const api = yield getContext('api');
	try {
		const res = yield call(api.get(`${apiRoutes.candidates}/${action.payload}`));
		yield put(assignCurrentCandidate(res.data));
	} catch (e) {
		yield put(assignCurrentCandidate(null));
	}
}

function* fetchCandidatesSaga() {
	const api = yield getContext('api');
	try {
		const res = yield call(api.get(`${apiRoutes.candidates}`));
		yield put(assignCandidates(res.data));
	} catch (e) {
		yield put(assignCandidates(null));
	}
}

function* candidatesSaga() {
	yield all([takeLatest(Action.FETCH_CANDIDATE, fetchCandidateSaga), takeLatest(Action.FETCH_CANDIDATES, fetchCandidatesSaga)]);
}

export default candidatesSaga;
