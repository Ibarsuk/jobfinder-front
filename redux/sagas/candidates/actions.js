const Action = {
	GET_CANDIDATES: `GET_CANDIDATES`,
	GET_CANDIDATE: `GET_CANDIDATE`,
};

export const getCandidate = payload => ({ type: Action.GET_CANDIDATE, payload });

export const getCandidates = () => ({ type: Action.GET_CANDIDATES });

export default Action;
