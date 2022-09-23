import { AsyncAction } from 'redux/actions';

export const auth = payload => ({ type: AsyncAction.AUTH, payload });

export const logout = () => ({ type: AsyncAction.LOGOUT });
