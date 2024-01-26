const Action = {
	FETCH_COMPANIES: `FETCH_COMPANIES`,
	FETCH_COMPANY: `FETCH_COMPANY`,
	CREATE_COMPANY: `CREATE_COMPANY`,
	SET_COMPANY_ACTIVE: `SET_COMPANY_ACTIVE`,
};

export const fetchCompany = payload => ({ type: Action.FETCH_COMPANY, payload });

export const fetchCompanies = () => ({ type: Action.FETCH_COMPANIES });

export const createCompany = payload => ({ type: Action.CREATE_COMPANY, payload });

export const setCompanyActive = payload => ({ type: Action.SET_COMPANY_ACTIVE, payload });

export default Action;
