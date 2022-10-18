import defaultRequestState from 'redux/stores/requests/defaultRequestState';
import { MIN_ALLOWED_AGE } from './const';
import Requests from '../redux/stores/requests/Requests';

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
