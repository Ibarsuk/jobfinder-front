import { all, call, put, getContext, takeLatest } from 'redux-saga/effects';

import apiRoutes from 'utils/apiRoutes';
import { assignCurrentCandidate, failCandidatesFetching, succesCandidatesFetching } from 'redux/stores/candidates';
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
		yield put(succesCandidatesFetching(res.data));
	} catch (e) {
		yield put(failCandidatesFetching(e.response.data.message));
	}
}

function* candidatesSaga() {
	yield all([takeLatest(Action.FETCH_CANDIDATE, fetchCandidateSaga), takeLatest(Action.FETCH_CANDIDATES, fetchCandidatesSaga)]);
}

export default candidatesSaga;
