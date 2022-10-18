import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tokens: {
		access: null,
		refresh: null,
	},
	isAuthChecked: false,
	user: {
		id: null,
		firstName: null,
		lastName: null,
		birthDate: null,
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

		auth(state, action) {
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
export const { initState, auth, logout } = userSlice.actions;
export default userSlice.reducer;
