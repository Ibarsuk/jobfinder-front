import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'utils/const';

const initialState = {
	tokens: {
		access: null,
		refresh: null,
	},
	isAuthChecked: false,
	authRequest: {
		status: RequestStatus.IDLE,
		error: null,
	},
	user: {
		id: null,
		firstName: null,
		lastName: null,
		age: null,
		email: null,
	},
};

const userSlice = createSlice({
	name: `user`,
	initialState,
	reducers: {
		initState(state, action) {
			state.tokens.access = action.payload.tokens?.access;
			state.tokens.refresh = action.payload.tokens?.refresh;
			state.user = { ...initialState.user, ...action.payload.user };
			state.isAuthChecked = true;
		},

		startAuth(state) {
			state.authRequest.status = RequestStatus.LOADING;
			state.authRequest.error = null;
		},

		failAuth(state, action) {
			state.authRequest.status = RequestStatus.FAILED;
			state.authRequest.error = action.payload;
		},

		successAuth(state, action) {
			state.authRequest.status = RequestStatus.SUCCESS;
			state.authRequest.error = null;
			state.tokens = action.payload.tokens;
			state.user = action.payload.user;
		},

		logout(state) {
			state.user = initialState.user;
			state.tokens = initialState.tokens;
		},
	},
});

export * from './selectors';
export const { startAuth, failAuth, successAuth, initState, logout } = userSlice.actions;
export default userSlice.reducer;
