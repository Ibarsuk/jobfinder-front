import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'utils/const';
import { getRequestReducerInitialState } from 'utils/util';

const initialState = getRequestReducerInitialState();

const requestsSlice = createSlice({
	name: `requests`,
	initialState,
	reducers: {
		startRequest(state, { payload }) {
			state[payload].status = RequestStatus.LOADING;
			state[payload].error = null;
		},

		failRequest(state, { payload }) {
			state[payload.request].status = RequestStatus.FAILED;
			state[payload.request].error = payload.error;
		},

		successRequest(state, { payload }) {
			state[payload].status = RequestStatus.SUCCESS;
			state[payload].error = null;
		},

		resetRequest(state, { payload }) {
			state[payload].status = RequestStatus.IDLE;
			state[payload].error = null;
		},
	},
});

export * from './selectors';
export const { startRequest, failRequest, successRequest, resetRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
