import { createSlice } from '@reduxjs/toolkit';
import { MAX_BACK_STEPS_ALLOWED } from 'utils/const';

export const initialState = {
	candidates: [],
	currentCandidate: 0,
	currentRequestCandidate: 0,
	fetchedCandidates: [],
	isStoreInitialized: false,
	runningRequests: 0,
};

const candidatesSlice = createSlice({
	name: `candidates`,
	initialState,
	reducers: {
		setCandidates(state, action) {
			state.candidates = action.payload;
		},

		addCandidates(state, action) {
			const isCandidatesListEmpty = !state.candidates.length;
			state.candidates.splice(0, state.currentCandidate - MAX_BACK_STEPS_ALLOWED);
			state.candidates = state.candidates.concat(action.payload);

			if (isCandidatesListEmpty || state.currentCandidate < MAX_BACK_STEPS_ALLOWED) {
				return;
			}

			state.currentRequestCandidate -= state.currentCandidate - MAX_BACK_STEPS_ALLOWED;
			state.currentCandidate = MAX_BACK_STEPS_ALLOWED;
		},

		addCandidatesInfo(state, { payload }) {
			state.fetchedCandidates.push(...payload);
		},

		completeRequestStep(state, { payload = 1 }) {
			state.currentRequestCandidate += payload;
		},

		removeCandidates(state, { payload }) {
			state.candidates = state.candidates.filter(candidate => !payload.includes(candidate));
		},

		initCandidatesState(state, action) {
			state.candidates = action.payload.candidates;
			state.currentCandidate = action.payload.currentCandidate;
			state.currentRequestCandidate = action.payload.currentCandidate;
			state.isStoreInitialized = true;
		},

		setNextCandidate(state) {
			if (state.currentCandidate < MAX_BACK_STEPS_ALLOWED) {
				state.currentCandidate++;
			} else {
				state.fetchedCandidates.shift();
			}
		},

		fetchNextCandidate(state) {
			state.runningRequests++;
			state.currentRequestCandidate++;
		},

		setPrevCandidate(state) {
			state.currentCandidate--;
		},

		completeRunningRequests(state, { payload = 1 }) {
			state.runningRequests -= payload;
		},
	},
});

export * from './selectors';
export const {
	setCandidates,
	initCandidatesState,
	addCandidates,
	addCandidatesInfo,
	completeRequestStep,
	removeCandidates,
	setNextCandidate,
	setPrevCandidate,
	completeRunningRequests,
	fetchNextCandidate,
} = candidatesSlice.actions;
export default candidatesSlice.reducer;
