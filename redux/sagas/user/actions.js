export const Action = {
	AUTH: `AUTH`,
	LOGOUT: `LOGOUT`,
};

export const auth = payload => ({ type: Action.AUTH, payload });

export const logout = () => ({ type: Action.LOGOUT });
