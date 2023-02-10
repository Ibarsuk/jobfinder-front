import { Action } from 'redux/globalActions';
import { addCandidates, initCandidatesState, initialState } from 'redux/stores/candidates';
import { logout, auth, initUserState } from 'redux/stores/user';
import { LocalStorageKey } from 'utils/const';
import LocalStorage from 'utils/localStorage';
import { checkIfDataExpired } from 'utils/util';

export default store => next => action => {
	if (action.type === logout.type) {
		LocalStorage.remove(LocalStorageKey.tokens);
		LocalStorage.remove(LocalStorageKey.user);
	}

	if (action.type === auth.type) {
		LocalStorage.write(LocalStorageKey.tokens, action.payload.tokens);
		LocalStorage.write(LocalStorageKey.user, action.payload.user);
	}

	if (action.type === Action.INIT_STATE) {
		const tokens = LocalStorage.read(LocalStorageKey.tokens);
		const user = LocalStorage.read(LocalStorageKey.user);
		store.dispatch(initUserState({ tokens, user }));

		const isCandidatesExpired = checkIfDataExpired(LocalStorageKey.candidatesLoadedTime);
		const candidates = isCandidatesExpired
			? initialState.candidates
			: LocalStorage.read(LocalStorageKey.candidates) || initialState.candidates;
		const currentCandidate = isCandidatesExpired
			? initialState.currentCandidate
			: LocalStorage.read(LocalStorageKey.currentCandidate) || initialState.currentCandidate;
		store.dispatch(initCandidatesState({ candidates, currentCandidate }));
	}

	next(action);
	if (action.type === addCandidates.type) {
		const candidatesStore = store.getState().candidates;
		LocalStorage.write(LocalStorageKey.candidates, candidatesStore.candidates);
		LocalStorage.write(LocalStorageKey.currentCandidate, candidatesStore.currentCandidate);
		LocalStorage.write(LocalStorageKey.candidatesLoadedTime, +new Date());
	}
};
