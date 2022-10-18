export const getAccessToken = state => state.user.tokens.access;

export const getRefreshToken = state => state.user.tokens.refresh;

export const getIfAuthChecked = state => state.user.isAuthChecked;

export const getUser = state => state.user.user;
