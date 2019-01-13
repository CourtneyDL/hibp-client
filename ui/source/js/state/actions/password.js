import { createAction } from 'redux-actions';

export const types = {
    PASSWORD_UPDATE: 'PASSWORD_UPDATE',
    PASSWORD_RESET: 'PASSWORD_RESET',
};

export const creators = {
    update: createAction(types.PASSWORD_UPDATE, count => count),
    reset: createAction(types.PASSWORD_RESET),
};
