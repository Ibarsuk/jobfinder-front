import defaultRequestState from 'redux/stores/requests/defaultRequestState';
import { FETCHED_DATA_DAYS_RELEVANCE, MIN_ALLOWED_AGE } from './const';
import Requests from '../redux/stores/requests/Requests';
import LocalStorage from './localStorage';

export const getMinAllowedBirthDate = () => {
	const current = new Date();
	current.setFullYear(current.getFullYear() - MIN_ALLOWED_AGE);
	return current;
};

export const getRequestReducerInitialState = () => {
	return Object.values(Requests).reduce((acc, current) => {
		acc[current] = { ...defaultRequestState };
		return acc;
	}, {});
};

export const getFormData = values =>
	Object.entries(values).reduce((formData, [field, value]) => {
		formData.append(field, value);
		return formData;
	}, new FormData());

export const checkIfDataExpired = key => {
	const lastUpdateTime = LocalStorage.read(key);

	if (!lastUpdateTime) {
		return false;
	}

	const currentTime = +new Date();
	return currentTime - lastUpdateTime > 1000 * 3600 * 24 * FETCHED_DATA_DAYS_RELEVANCE;
};
