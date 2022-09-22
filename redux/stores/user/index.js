import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'utils/const';

const initialState = {
	tokens: {
		access: null,
		refresh: null,
	},
	authRequest: {
		status: RequestStatus.IDLE,
		error: null,
	},
	user: null,
};

const userSlice = createSlice({
	name: `user`,
	initialState,
	reducers: {
		initState(state, action) {
			state.tokens = action.payload.tokens;
			state.user = action.payload.user;
		},

		startAuth(state) {
			state.authRequest.status = RequestStatus.LOADING;
		},

		failAuth(state, action) {
			state.authRequest.status = RequestStatus.FAILED;
			state.authRequest.error = action.payload;
		},

		successAuth(state, action) {
			state.authRequest.status = RequestStatus.SUCCESS;
			state.tokens = action.payload.tokens;
			state.user = action.payload.user;
		},
	},
});

export * from './selectors';
export const { startAuth, failAuth, successAuth, initState } = userSlice.actions;
export default userSlice.reducer;
