import { logout, successAuth } from 'redux/stores/user';
import LocalStorage from 'utils/localStorage';

export default state => next => action => {
	if (action.type === logout.type) {
		LocalStorage.remove(`tokens`);
		LocalStorage.remove(`user`);
	}

	if (action.type === successAuth.type) {
		LocalStorage.write(`tokens`, action.payload.tokens);
		LocalStorage.write(`user`, action.payload.user);
	}
	next(action);
};
