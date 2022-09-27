import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'utils/const';

const initialState = {
	currentCandidate: null,
	candidates: null,

	candidatesRequest: {
		status: RequestStatus.IDLE,
		error: null,
	},
};

const candidatesSlice = createSlice({
	name: `candidates`,
	initialState,
	reducers: {
		startCandidatesFetching(state) {
			state.candidatesRequest.status = RequestStatus.LOADING;
			state.candidatesRequest.error = null;
		},

		failCandidatesFetching(state, action) {
			state.candidatesRequest.status = RequestStatus.FAILED;
			state.candidatesRequest.error = action.payload;
		},

		succesCandidatesFetching(state, action) {
			state.candidatesRequest.status = RequestStatus.SUCCESS;
			state.candidatesRequest.error = null;
			state.candidates = action.payload;
		},
	},
});

export * from './selectors';
export const { startCandidatesFetching, failCandidatesFetching, succesCandidatesFetching } = candidatesSlice.actions;
export default candidatesSlice.reducer;
