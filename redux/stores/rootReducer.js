import { combineReducers } from '@reduxjs/toolkit';
import candidates from './candidates';
import user from './user';
import requests from './requests';

export default combineReducers({
	user,
	candidates,
	requests,
});
