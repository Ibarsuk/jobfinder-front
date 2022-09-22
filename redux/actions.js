export const AsyncAction = {
	AUTH: `AUTH`,
};

export const Action = {
	REDIRECT: `REDIRECT`,
};

export const redirect = payload => ({ type: Action.REDIRECT, payload });
