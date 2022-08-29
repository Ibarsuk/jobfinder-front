import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentCandidate: null,
	candidates: null,
};

const candidatesSlice = createSlice({
	name: `candidates`,
	initialState,
	reducers: {
		assignCurrentCandidate(state, action) {
			state.currentCandidate = action.payload;
		},

		assignCandidates(state, action) {
			state.candidates = action.payload;
		},
	},
});

export * from './selectors';
export const { assignCurrentCandidate, assignCandidates } = candidatesSlice.actions;
export default candidatesSlice.reducer;
