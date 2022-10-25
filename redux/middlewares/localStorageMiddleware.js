import { Action } from 'redux/globalActions';
import { initCandidatesState } from 'redux/stores/candidates';
import { logout, auth, initUserState } from 'redux/stores/user';
import LocalStorage from 'utils/localStorage';

export default store => next => action => {
	if (action.type === logout.type) {
		LocalStorage.remove(`tokens`);
		LocalStorage.remove(`user`);
	}

	if (action.type === auth.type) {
		LocalStorage.write(`tokens`, action.payload.tokens);
		LocalStorage.write(`user`, action.payload.user);
	}

	if (action.type === Action.INIT_STATE) {
		const tokens = LocalStorage.read(`tokens`);
		const user = LocalStorage.read(`user`);
		store.dispatch(initUserState({ tokens, user }));

		const candidates = LocalStorage.read(`candidates`);
		const currentCandidate = LocalStorage.read(`currentCandidate`);
		const currentRequestCandidate = LocalStorage.read(`currentRequestCandidate`);
		const fetchedCandidates = LocalStorage.read(`fetchedCandidates`);
		store.dispatch(initCandidatesState({ candidates, currentCandidate, currentRequestCandidate, fetchedCandidates }));
	}
	next(action);
};
