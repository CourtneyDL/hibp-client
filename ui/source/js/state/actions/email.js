import { createAction } from 'redux-actions';

export const types = {
    EMAIL_UPDATE: 'EMAIL_UPDATE',
    EMAIL_RESULT_TOGGLE: 'EMAIL_RESULT_TOGGLE',
    EMAIL_RESET: 'EMAIL_RESET',
};

export const creators = {
    update: createAction(types.EMAIL_UPDATE, result => result),
    toggle: createAction(types.EMAIL_RESULT_TOGGLE, email => email),
    reset: createAction(types.EMAIL_RESET),
};
