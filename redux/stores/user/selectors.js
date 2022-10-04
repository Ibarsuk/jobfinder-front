export const getAccessToken = state => state.user.tokens.access;

export const getRefreshToken = state => state.user.tokens.refresh;

export const getAuthRequest = state => state.user.authRequest;

export const getCreateUserRequest = state => state.user.createUserRequest;

export const getIfAuthChecked = state => state.user.isAuthChecked;

export const getUser = state => state.user.user;
