import axios from 'axios';
import store from 'redux/store';

import { auth, getAccessToken, getRefreshToken, logout } from 'redux/stores/user';
import apiRoutes from './apiRoutes';
import { StatusCode } from './const';

const TIMEOUT = 10000;
const URL = `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/api/`;

const api = axios.create({
	baseURL: URL,
	timeout: TIMEOUT,
});

api.interceptors.request.use(config => {
	config.headers.authorization = `Bearer ${getAccessToken(store.getState())}`;
	return config;
});

api.interceptors.response.use(
	async res => {
		if (res.status === StatusCode.TOKEN_REFRESH) {
			try {
				const refreshRes = await api.post(apiRoutes.users.refresh, { token: getRefreshToken(store.getState()) });
				store.dispatch(auth(refreshRes.data));
				return api.request(res.config);
			} catch (e) {
				store.dispatch(logout());
			}
		}

		return res;
	}
	// ,
	// async err => {
	// 	const { status } = err.response;
	// 	switch (status) {
	// 		case StatusCode.NOT_FOUND:
	// 			throw new NotFoundError();

	// 		case StatusCode.BAD_REQUEST:
	// 			throw new ValidationError(err);

	// 		case StatusCode.UNAUTHORIZED:
	// 			throw new UnauthorizedError();

	// 		case StatusCode.FORBIDDEN:
	// 			throw new UnauthorizedError();
	// 	}
	// 	return Promise.reject(err);
	// }
);

export default api;
