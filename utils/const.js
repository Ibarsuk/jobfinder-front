export const MIN_ALLOWED_AGE = 14;

export const FORMS_INFO_ARRAY_SIZE = 5;

export const MAX_BACK_STEPS_ALLOWED = 3;

export const FETCHED_DATA_DAYS_RELEVANCE = 3;

export const StatusCode = {
	OK: 200,
	CREATED: 201,
	TOKEN_REFRESH: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
};

export const RequestStatus = {
	IDLE: `IDLE`,
	LOADING: `LOADING`,
	SUCCESS: `SUCCESS`,
	FAILED: `FAILED`,
};

export const LocalStorageKey = {
	tokens: `tokens`,
	user: `user`,
	candidatesLoadedTime: `candidatesLoadedTime`,
	candidates: `candidates`,
	currentCandidate: `currentCandidate`,
};
