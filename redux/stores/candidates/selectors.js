export const getCurrentCandidate = state => state.candidates.currrentCandidate;

export const getCandidates = state => state.candidates.candidates;

export const getCurrentRequestCandidate = state => state.candidates.currentRequestCandidate;

export const getCurrentCandidateInfo = state => state.candidates.fetchedCandidates[0];

export const getIfCandidatesInitialized = state => state.candidates.isStoreInitialized;

export const getRunningRequestsNumber = state => state.candidates.runningRequests;
