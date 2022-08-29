import { combineReducers } from '@reduxjs/toolkit';
import candidates from './candidates';
import user from './user';

export default combineReducers({
	user,
	candidates,
});
