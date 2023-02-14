import { createSelector } from '@reduxjs/toolkit';

export const getAccessToken = state => state.user.tokens.access;

export const getRefreshToken = state => state.user.tokens.refresh;

export const getIfAuthChecked = state => state.user.isAuthChecked;

export const getUser = state => state.user.user;

export const getUserRoles = state => state.user.user.roles;

export const checkUserRole = createSelector(
	[getUserRoles],
	(_state, role) => role,
	(roles, role) => roles.includes(role)
);

export const checkUserRoleFactory = () => checkUserRole;
