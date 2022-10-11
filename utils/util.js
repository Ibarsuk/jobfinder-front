import { MIN_ALLOWED_AGE } from './const';

export const getMinAllowedBirthDate = () => {
	const current = new Date();
	current.setFullYear(current.getFullYear() - MIN_ALLOWED_AGE);
	return current;
};
