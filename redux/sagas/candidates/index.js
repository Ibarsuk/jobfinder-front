import { all, call, put, getContext, takeLatest, select, takeEvery } from 'redux-saga/effects';

import apiRoutes from 'utils/apiRoutes';
import {
	addCandidates,
	addCandidatesInfo,
	assignCurrentCandidate,
	completeRequestStep,
	completeRunningRequests,
	fetchNextCandidate,
	getCandidatesState,
	removeCandidates,
	setNextCandidate as setNextStateCandidate,
} from 'redux/stores/candidates';
import { failRequest, startRequest, successRequest } from 'redux/stores/requests';
import Requests from 'redux/stores/requests/Requests';
import routes from 'utils/routes';
import { redirect } from 'redux/globalActions';
import { getFormData } from 'utils/util';
import { FORMS_INFO_ARRAY_SIZE } from 'utils/const';
import Action from './actions';

function* getCandidatesInfoSaga(action) {
	const api = yield getContext('api');
	try {
		const res = yield call(api.get, `${apiRoutes.candidates.index}/${action.payload}`);
		yield put(assignCurrentCandidate(res.data));
	} catch (e) {
		yield put(assignCurrentCandidate(null));
	}
}

function* addCandidatesSaga() {
	const api = yield getContext('api');
	yield put(startRequest(Requests.getCandidates));
	try {
		const res = yield call(api.get, `${apiRoutes.candidates.index}`);
		yield all([put(successRequest(Requests.getCandidates)), put(addCandidates(res.data))]);
	} catch (e) {
		yield put(failRequest({ request: Requests.getCandidates, error: e.response.data.message }));
	}
}

function* selectCandidatesWithUnderflowCheck(candidatesNeededToFetch) {
	const state = yield select(getCandidatesState);

	if (state.currentRequestCandidate + candidatesNeededToFetch > state.candidates.length) {
		yield addCandidatesSaga();
		const reselectedState = yield select(getCandidatesState);
		return reselectedState;
	}

	return state;
}

function* getCandidatesToCompleteFilling(formsNumberToCompletefilling) {
	const api = yield getContext('api');
	const candidatesToCompleteFilling = [];
	let remainingFormsNumberToCompletefilling = formsNumberToCompletefilling;

	while (remainingFormsNumberToCompletefilling > 0) {
		const { candidates, currentRequestCandidate } = yield selectCandidatesWithUnderflowCheck(
			remainingFormsNumberToCompletefilling
		);

		const candidateFormsIdToLoad = candidates.slice(
			currentRequestCandidate,
			currentRequestCandidate + remainingFormsNumberToCompletefilling
		);

		const res = yield call(api.get, `${apiRoutes.candidates.info}`, { params: { ids: candidateFormsIdToLoad } });
		const formsNumberSuccessfullyFetched = res.data.data.length;
		const formsFailedToFetch = res.data.not_found;

		if (formsNumberSuccessfullyFetched) {
			candidatesToCompleteFilling.push(...res.data.data);
			remainingFormsNumberToCompletefilling -= formsNumberSuccessfullyFetched;
			yield put(completeRequestStep(formsNumberSuccessfullyFetched));
		}

		if (formsFailedToFetch.length) {
			yield put(removeCandidates(formsFailedToFetch));
		}
	}
	return candidatesToCompleteFilling;
}

export function* getCandidatesInfoOnLoadSaga() {
	const api = yield getContext('api');
	const { candidates, currentCandidate } = yield selectCandidatesWithUnderflowCheck(FORMS_INFO_ARRAY_SIZE);

	const candidateFormsIdToLoad = candidates.slice(currentCandidate, currentCandidate + FORMS_INFO_ARRAY_SIZE);
	yield put(startRequest(Requests.getCandidatesInfoOnLoad));
	try {
		const res = yield call(api.get, `${apiRoutes.candidates.info}`, { params: { ids: candidateFormsIdToLoad } });
		let receivedForms = res.data.data;

		yield put(completeRequestStep(receivedForms.length));
		const notFoundFormsNumber = res.data.not_found.length;

		if (notFoundFormsNumber) {
			yield put(removeCandidates(res.data.not_found));
			const additionallyReceivedForms = yield getCandidatesToCompleteFilling(notFoundFormsNumber);
			receivedForms = receivedForms.concat(additionallyReceivedForms);
		}

		yield all([put(successRequest(Requests.getCandidatesInfoOnLoad)), put(addCandidatesInfo(receivedForms))]);
	} catch (e) {
		yield put(failRequest({ request: Requests.getCandidatesInfoOnLoad, error: e.response.data.message }));
	}
}

function* createCandidateSaga(action) {
	const api = yield getContext('api');
	yield put(startRequest(Requests.createCandidate));
	try {
		yield call(api.post, apiRoutes.candidates.index, getFormData(action.payload), {
			Headers: { 'Content-Type': 'multipart/form-data' },
		});
		yield all([put(successRequest(Requests.createCandidate)), put(redirect(routes.user.index))]);
	} catch (e) {
		yield put(failRequest({ request: Requests.createCandidate, error: e.response?.data.message || e.message }));
	}
}

function* fetchNextCandidateSaga() {
	const api = yield getContext('api');
	const state = yield select(getCandidatesState);
	yield put(fetchNextCandidate());

	try {
		const res = yield call(api.get, `${apiRoutes.candidates.info}`, {
			params: { ids: [state.candidates[state.currentRequestCandidate]] },
		});

		yield put(completeRunningRequests());
		if (!res.data.data.length) {
			return yield fetchNextCandidateSaga();
		}

		yield put(addCandidatesInfo(res.data.data));
	} catch (e) {
		yield put(completeRunningRequests());
	}
}

function* setNextCandidateSaga() {
	yield put(setNextStateCandidate());
	yield fetchNextCandidateSaga();
}

function* candidatesSaga() {
	yield all([
		takeLatest(Action.GET_CANDIDATES_IFO_ON_LOAD, getCandidatesInfoOnLoadSaga),
		takeLatest(Action.GET_CANDIDATE_INFO, getCandidatesInfoSaga),
		takeLatest(Action.ADD_CANDIDATES, addCandidatesSaga),
		takeLatest(Action.CREATE_CANDIDATE, createCandidateSaga),
		takeEvery(Action.SET_NEXT_CANDIDATE, setNextCandidateSaga),
	]);
}

export default candidatesSaga;
