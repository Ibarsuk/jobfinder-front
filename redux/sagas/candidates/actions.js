const Action = {
	FETCH_CANDIDATES: `FETCH_CANDIDATES`,
	FETCH_CANDIDATE: `FETCH_CANDIDATE`,
};

export const fetchCandidate = payload => ({ type: Action.FETCH_CANDIDATE, payload });

export const fetchCandidates = () => ({ type: Action.FETCH_CANDIDATES });

export default Action;
