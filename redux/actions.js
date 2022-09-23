export const AsyncAction = {
	AUTH: `AUTH`,
	LOGOUT: `LOGOUT`,
};

export const Action = {
	REDIRECT: `REDIRECT`,
};

export const redirect = payload => ({ type: Action.REDIRECT, payload });
