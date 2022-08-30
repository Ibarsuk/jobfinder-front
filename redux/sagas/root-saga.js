import { spawn } from 'redux-saga/effects';

import candidatesSaga from './candidates';
import userSaga from './user';

export default function* rootSaga() {
	yield spawn(userSaga);
	yield spawn(candidatesSaga);
}
