import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: null,
};

const userSlice = createSlice({
	name: `user`,
	initialState,
	reducers: {
		addToken(state, action) {
			state.token = action.payload;
		},
	},
});

export * from './selectors';
export const { addToken } = userSlice.actions;
export default userSlice.reducer;
