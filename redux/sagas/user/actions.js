import { AsyncAction } from 'redux/actions';

export const auth = payload => ({ type: AsyncAction.AUTH, payload });
