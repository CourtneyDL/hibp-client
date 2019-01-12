import { createAction } from 'redux-actions';

export const types = {
    BASIC_START: 'BASIC_START',
    BASIC_COMPLETE: 'BASIC_COMPLETE',
    BASIC_FAIL: 'BASIC_FAIL',
};

export const creators = {
    start: createAction(types.BASIC_START),
    complete: createAction(types.BASIC_COMPLETE),
    fail: createAction(types.BASIC_FAIL),
};
