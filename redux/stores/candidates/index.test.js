import reducer, { addCandidates, initialState } from './index';

describe(`Candidates reducer works correctly`, () => {
	describe(`Candidates adding works correctly`, () => {
		it(`Adds when empty state`, () => {
			const state = { ...initialState };

			const newCandidates = [45, 856, 442, 765];

			const expectedState = { ...initialState, candidates: newCandidates };

			expect(reducer(state, addCandidates(newCandidates))).toEqual(expectedState);
		});

		it(`Adds when not empty`, () => {
			const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			const state = {
				candidates,
				currentCandidate: 5,
				currentRequestCandidate: 9,
				fetchedCandidates: [],
				isStoreInitialized: true,
				runningRequests: 0,
			};

			const newCandidates = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

			const expectedState = {
				candidates: [3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
				currentCandidate: 3,
				currentRequestCandidate: 7,
				fetchedCandidates: [],
				isStoreInitialized: true,
				runningRequests: 0,
			};

			expect(reducer(state, addCandidates(newCandidates))).toEqual(expectedState);
		});
	});
});
