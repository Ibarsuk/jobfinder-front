import { createSelector } from '@reduxjs/toolkit';
import { MAX_BACK_STEPS_ALLOWED } from 'utils/const';
import { checkUserRoleFactory } from '../user';

const vipRoleSelector = checkUserRoleFactory();

export const getCurrentCandidate = state => state.candidates.currentCandidate;

export const getCandidates = state => state.candidates.candidates;

export const getCurrentRequestCandidate = state => state.candidates.currentRequestCandidate;

export const getCurrentCandidateInfo = state => state.candidates.fetchedCandidates[state.candidates.currentCandidate];

export const getCandidatesInfoLength = state => state.candidates.fetchedCandidates.length;

export const getIfCandidatesInitialized = state => state.candidates.isStoreInitialized;

export const getRunningRequestsNumber = state => state.candidates.runningRequests;

export const getCandidatesState = state => state.candidates;

export const getIfNextStepAllowed = ({ candidates }) =>
	!(candidates.fetchedCandidates.length <= MAX_BACK_STEPS_ALLOWED + 1 && candidates.runningRequests);

export const getIfBackStepAllowed = createSelector(
	[state => vipRoleSelector(state, `vip`), getCurrentCandidate],
	(isVip, currentCandidate) => isVip && currentCandidate > 0
);
