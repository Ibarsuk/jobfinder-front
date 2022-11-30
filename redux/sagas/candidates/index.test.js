/* eslint-disable jest/expect-expect */

import rootReducer from 'redux/stores/rootReducer';

const { expectSaga } = require('redux-saga-test-plan');
const { getContext, call } = require('redux-saga/effects');
const { initialState } = require('redux/stores/candidates');
const { default: apiRoutes } = require('utils/apiRoutes');
const { getCandidatesInfoOnLoadSaga } = require('.');

const fakeApi = {
	get: () => {},
	post: () => {},
};

const getFakeInfoApiCall = ids => call(fakeApi.get, `${apiRoutes.candidates.info}`, { params: { ids } });
const getFakeCandidatesApiCall = () => call(fakeApi.get, `${apiRoutes.candidates.index}`);

const getFakeApiResponse = (foundIds, notFoundIds) => ({
	data: {
		data: foundIds.map(id => ({
			id,
		})),
		not_found: notFoundIds,
	},
});

const getFakeCandidatesApiResponse = foundIds => ({
	data: foundIds,
});

describe(`Forms info fetches correctly on page load`, () => {
	it(`Correct fetching form data on page load`, async () => {
		const initialStoreState = {
			...initialState,
			isStoreInitialized: true,
			candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		};

		const { storeState } = await expectSaga(getCandidatesInfoOnLoadSaga)
			.provide([
				[getContext('api'), fakeApi],

				[getFakeInfoApiCall([1, 2, 3, 4, 5]), getFakeApiResponse([1, 4], [2, 3, 5])],
				[getFakeInfoApiCall([6, 7, 8]), getFakeApiResponse([6, 8], [7])],
				[getFakeInfoApiCall([9]), getFakeApiResponse([], [9])],
				[getFakeInfoApiCall([10]), getFakeApiResponse([10], [])],
			])
			.withReducer(rootReducer, { candidates: initialStoreState })
			.run();

		expect(storeState.candidates).toEqual({
			...initialStoreState,
			currentRequestCandidate: 5,
			fetchedCandidates: [{ id: 1 }, { id: 4 }, { id: 6 }, { id: 8 }, { id: 10 }],
			candidates: [1, 4, 6, 8, 10, 11, 12, 13],
		});
	});

	it(`Correct fetching when additional steps not reauired`, async () => {
		const initialStoreState = {
			...initialState,
			isStoreInitialized: true,
			currentCandidate: 3,
			currentRequestCandidate: 3,
			candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		};

		const { storeState } = await expectSaga(getCandidatesInfoOnLoadSaga)
			.provide([
				[getContext('api'), fakeApi],

				[getFakeInfoApiCall([4, 5, 6, 7, 8]), getFakeApiResponse([4, 5, 6, 7, 8], [])],
			])
			.withReducer(rootReducer, { candidates: initialStoreState })
			.run();

		expect(storeState.candidates).toEqual({
			...initialStoreState,
			currentCandidate: 3,
			currentRequestCandidate: 8,
			fetchedCandidates: [{ id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }],
			candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		});
	});

	it(`Correct fetching when additional request for candidates is needed`, async () => {
		const initialStoreState = {
			...initialState,
			isStoreInitialized: true,
			currentCandidate: 3,
			currentRequestCandidate: 3,
			candidates: [1, 2, 3, 4, 5, 6, 7],
		};

		const { storeState } = await expectSaga(getCandidatesInfoOnLoadSaga)
			.provide([
				[getContext('api'), fakeApi],

				[getFakeCandidatesApiCall(), getFakeCandidatesApiResponse([8, 9, 10, 11, 12, 13, 14, 15])],
				[getFakeInfoApiCall([4, 5, 6, 7, 8]), getFakeApiResponse([], [4, 5, 6, 7, 8])],
				[getFakeInfoApiCall([9, 10, 11, 12, 13]), getFakeApiResponse([9, 11, 12, 13], [10])],
				[getFakeInfoApiCall([14]), getFakeApiResponse([14], [])],
			])
			.withReducer(rootReducer, { candidates: initialStoreState })
			.run();

		expect(storeState.candidates).toEqual({
			...initialStoreState,
			currentCandidate: 3,
			currentRequestCandidate: 8,
			fetchedCandidates: [{ id: 9 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }],
			candidates: [1, 2, 3, 9, 11, 12, 13, 14, 15],
		});
	});

	it(`Correct fetching when additional request for candidates is needed during filling`, async () => {
		const initialStoreState = {
			...initialState,
			isStoreInitialized: true,
			currentCandidate: 1,
			currentRequestCandidate: 1,
			candidates: [1, 2, 3, 4, 5, 6, 7],
		};

		const { storeState } = await expectSaga(getCandidatesInfoOnLoadSaga)
			.provide([
				[getContext('api'), fakeApi],

				[getFakeCandidatesApiCall(), getFakeCandidatesApiResponse([8, 9, 10, 11, 12, 13, 14, 15])],
				[getFakeInfoApiCall([2, 3, 4, 5, 6]), getFakeApiResponse([2, 5], [3, 4, 6])],
				[getFakeInfoApiCall([7, 8, 9]), getFakeApiResponse([7, 8, 9], [])],
			])
			.withReducer(rootReducer, { candidates: initialStoreState })
			.run();

		expect(storeState.candidates).toEqual({
			...initialStoreState,
			currentCandidate: 1,
			currentRequestCandidate: 6,
			fetchedCandidates: [{ id: 2 }, { id: 5 }, { id: 7 }, { id: 8 }, { id: 9 }],
			candidates: [1, 2, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		});
	});
});
