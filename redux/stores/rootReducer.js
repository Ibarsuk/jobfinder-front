import { combineReducers } from '@reduxjs/toolkit';
import candidates from './candidates';
import user from './user';
import requests from './requests';
import companies from './companies';

export default combineReducers({
	user,
	candidates,
	requests,
	companies,
});
