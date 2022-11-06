const Action = {
	ADD_CANDIDATES: `ADD_CANDIDATES`,
	FETCH_CANDIDATE: `FETCH_CANDIDATE`,
	CREATE_CANDIDATE: `CREATE_CANDIDATE`,
	GET_CANDIDATES_INFO: `GET_CANDIDATES_INFO`,
};

export const fetchCandidate = payload => ({ type: Action.FETCH_CANDIDATE, payload });

export const addCandidates = () => ({ type: Action.ADD_CANDIDATES });

export const createCandidate = payload => ({ type: Action.CREATE_CANDIDATE, payload });

export const getCandidatesInfo = () => ({ type: Action.GET_CANDIDATES_INFO });

export default Action;
