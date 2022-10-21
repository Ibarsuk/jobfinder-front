import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentCompany: null,
	companies: null,
};

const companiesSlice = createSlice({
	name: `companies`,
	initialState,
	reducers: {
		setCompanies(state, action) {
			state.companies = action.payload;
		},
	},
});

export * from './selectors';
export const { setCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;
