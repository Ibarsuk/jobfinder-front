export const Action = {
	AUTH: `AUTH`,
	LOGOUT: `LOGOUT`,
	CREATE_USER: `CREATE_USER`,
};

export const auth = payload => ({ type: Action.AUTH, payload });

export const createUser = payload => ({ type: Action.CREATE_USER, payload });

export const logout = () => ({ type: Action.LOGOUT });
