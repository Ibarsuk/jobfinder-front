export const Action = {
	REDIRECT: `REDIRECT`,
	INIT_STATE: `INIT_STATE`,
};

export const redirect = payload => ({ type: Action.REDIRECT, payload });

export const initState = () => ({ type: Action.INIT_STATE });
