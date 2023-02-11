const Action = {
	ADD_CANDIDATES: `ADD_CANDIDATES`,
	FETCH_CANDIDATE: `FETCH_CANDIDATE`,
	CREATE_CANDIDATE: `CREATE_CANDIDATE`,
	GET_CANDIDATE_INFO: `GET_CANDIDATE_INFO`,
	GET_CANDIDATES_IFO_ON_LOAD: `GET_CANDIDATES_INFO_ON_LOAD`,
	SET_NEXT_CANDIDATE: `SET_NEXT_CANDIDATE`,
};

export const fetchCandidate = payload => ({ type: Action.FETCH_CANDIDATE, payload });

export const addCandidates = () => ({ type: Action.ADD_CANDIDATES });

export const createCandidate = payload => ({ type: Action.CREATE_CANDIDATE, payload });

export const getCandidateInfo = () => ({ type: Action.GET_CANDIDATE_INFO });

export const getCandidatesInfoOnLoad = () => ({ type: Action.GET_CANDIDATES_IFO_ON_LOAD });

export const setNextCandidate = () => ({ type: Action.SET_NEXT_CANDIDATE });

export default Action;
