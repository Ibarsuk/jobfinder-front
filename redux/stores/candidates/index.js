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
			state.currentRequestCandidate = isCandidatesListEmpty
				? 0
				: state.currentRequestCandidate - (state.currentCandidate - MAX_BACK_STEPS_ALLOWED);
			state.currentCandidate = isCandidatesListEmpty ? 0 : MAX_BACK_STEPS_ALLOWED;
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
export const { setCandidates, initCandidatesState, addCandidates } = candidatesSlice.actions;
export default candidatesSlice.reducer;
