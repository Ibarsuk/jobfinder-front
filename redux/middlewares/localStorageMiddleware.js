import { Action } from 'redux/globalActions';
import { addCandidates, initCandidatesState, initialState } from 'redux/stores/candidates';
import { logout, auth, initUserState } from 'redux/stores/user';
import LocalStorage from 'utils/localStorage';
import { checkIfDataExpired } from 'utils/util';

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

		const isCandidatesExpired = checkIfDataExpired(`candidatesLoadedTime`);
		const candidates = isCandidatesExpired
			? initialState.candidates
			: LocalStorage.read(`candidates`) || initialState.candidates;
		const currentCandidate = isCandidatesExpired
			? initialState.currentCandidate
			: LocalStorage.read(`currentCandidate`) || initialState.currentCandidate;
		store.dispatch(initCandidatesState({ candidates, currentCandidate }));
	}

	next(action);
	if (action.type === addCandidates.type) {
		const candidatesStore = store.getState().candidates;
		LocalStorage.write(`candidates`, candidatesStore.candidates);
		LocalStorage.write(`currentCandidate`, candidatesStore.currentCandidate);
		LocalStorage.write(`candidatesLoadedTime`, +new Date());
	}
};
