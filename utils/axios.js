import axios from 'axios';
import store from 'redux/store';

import { addToken, getAccessToken, getRefreshToken } from 'redux/stores/user';
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
				const { tokens, user } = await api.post('/refresh', getRefreshToken(store.getState()));
				store.dispatch(addToken(tokens));
				return api.request(res.config);
			} catch (e) {
				// throw new UnauthorizedError();
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
