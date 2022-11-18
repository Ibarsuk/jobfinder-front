import { all, call, put, getContext, takeLatest } from 'redux-saga/effects';

import apiRoutes from 'utils/apiRoutes';
import { failRequest, startRequest, successRequest } from 'redux/stores/requests';
import Requests from 'redux/stores/requests/Requests';
import routes from 'utils/routes';
import { redirect } from 'redux/globalActions';
import { getFormData } from 'utils/util';
import { setCompanies } from 'redux/stores/companies';
import Adapter from 'utils/Adapter';
import Action from './actions';

function* fetchCompaniesSaga() {
	const api = yield getContext('api');
	yield put(startRequest(Requests.getCompanies));
	try {
		const res = yield call(api.get, `${apiRoutes.companies.index}`);
		yield all([put(successRequest(Requests.getCompanies)), put(setCompanies(res.data))]);
	} catch (e) {
		yield put(failRequest({ request: Requests.getCompanies, error: e.response.data.message }));
	}
}

function* createCompanySaga(action) {
	const api = yield getContext('api');
	yield put(startRequest(Requests.createCompany));
	try {
		const data = getFormData(Adapter.adaptCompanyToServer(action.payload));
		yield call(api.post, apiRoutes.companies.index, data, {
			Headers: { 'Content-Type': 'multipart/form-data' },
		});
		yield all([put(successRequest(Requests.createCompany)), put(redirect(routes.user.index))]);
	} catch (e) {
		yield put(failRequest({ request: Requests.createCompany, error: e.response?.data.message || e.message }));
	}
}

function* companiesSaga() {
	yield all([takeLatest(Action.FETCH_COMPANIES, fetchCompaniesSaga), takeLatest(Action.CREATE_COMPANY, createCompanySaga)]);
}

export default companiesSaga;
