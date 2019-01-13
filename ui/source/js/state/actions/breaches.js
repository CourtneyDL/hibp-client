import { createAction } from 'redux-actions';

export const types = {
    BREACHES_START: 'BREACHES_START',
    BREACHES_UPDATE: 'BREACHES_UPDATE',
    BREACHES_COMPLETE: 'BREACHES_COMPLETE',
    BREACHES_FAIL: 'BREACHES_FAIL',
};

export const creators = {
    start: createAction(types.BREACHES_START),
    update: createAction(types.BREACHES_UPDATE, (breaches={}) => breaches),
    complete: createAction(types.BREACHES_COMPLETE),
    fail: createAction(types.BREACHES_FAIL),
};