import Router from 'next/router';
import { Action } from 'redux/actions';

export default state => next => action => {
	if (action.type === Action.REDIRECT) {
		Router.push(`/`);
	}
	next(action);
};
