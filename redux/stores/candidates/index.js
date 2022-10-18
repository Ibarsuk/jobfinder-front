import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentCandidate: null,
	candidates: null,
};

const candidatesSlice = createSlice({
	name: `candidates`,
	initialState,
	reducers: {
		setCandidates(state, action) {
			state.candidates = action.payload;
		},
	},
});

export * from './selectors';
export const { setCandidates } = candidatesSlice.actions;
export default candidatesSlice.reducer;
