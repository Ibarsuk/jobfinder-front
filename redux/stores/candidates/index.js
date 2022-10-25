import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	candidates: null,
	currentCandidate: null,
	currentRequestCandidate: null,
	fetchedCandidates: null,
	isStoreInitialized: false,
};

const candidatesSlice = createSlice({
	name: `candidates`,
	initialState,
	reducers: {
		setCandidates(state, action) {
			state.candidates = action.payload;
		},

		initCandidatesState(state, action) {
			state.candidates = action.payload.candidates;
			state.currentCandidate = action.payload.currentCandidate;
			state.currentRequestCandidate = action.payload.currentRequestCandidate;
			state.fetchedCandidates = action.payload.fetchedCandidates;
			state.isStoreInitialized = true;
		},
	},
});

export * from './selectors';
export const { setCandidates, initCandidatesState } = candidatesSlice.actions;
export default candidatesSlice.reducer;
