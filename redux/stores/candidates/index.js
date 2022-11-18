import { createSlice } from '@reduxjs/toolkit';
import { FORMS_INFO_ARRAY_SIZE, MAX_BACK_STEPS_ALLOWED } from 'utils/const';

export const initialState = {
	candidates: [],
	currentCandidate: 0,
	currentRequestCandidate: FORMS_INFO_ARRAY_SIZE,
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

			if (isCandidatesListEmpty || !state.currentCandidate) {
				return;
			}

			state.currentRequestCandidate -= state.currentCandidate - MAX_BACK_STEPS_ALLOWED;
			state.currentCandidate = MAX_BACK_STEPS_ALLOWED;
		},

		addCandidatesInfo(state, action) {
			state.fetchedCandidates.push(...action.payload);
		},

		addCandidateInfo() {},

		completeRequestStep(state, { payload = 1 }) {
			state.currentRequestCandidate += payload;
		},

		initCandidatesState(state, action) {
			state.candidates = action.payload.candidates;
			state.currentCandidate = action.payload.currentCandidate;
			state.currentRequestCandidate = action.payload.currentRequestCandidate;
			state.isStoreInitialized = true;
		},
	},
});

export * from './selectors';
export const { setCandidates, initCandidatesState, addCandidates, addCandidatesInfo, completeRequestStep } =
	candidatesSlice.actions;
export default candidatesSlice.reducer;
