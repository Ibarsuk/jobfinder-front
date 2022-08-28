import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';

export default combineReducers({
	auth: userReducer,
});
