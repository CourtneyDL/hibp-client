import { createAction } from 'redux-actions';

export const types = {
    SEARCH_QUERY: 'SEARCH_QUERY',
    SEARCH_MODE: 'SEARCH_MODE',
    SEARCH_LIST_ADD: 'SEARCH_LIST_ADD',
    SEARCH_LIST_REMOVE: 'SEARCH_LIST_REMOVE',
    SEARCH_LIST_SHOW: 'SEARCH_LIST_SHOW',
    SEARCH_LIST_HIDE: 'SEARCH_LIST_HIDE',
    SEARCH_ENABLED: 'SEARCH_ENABLED',
    SEARCH_DISABLED: 'SEARCH_DISABLED',
    SEARCH_RESET: 'SEARCH_RESET',
    SEARCH_START: 'SEARCH_START',
    SEARCH_COMPLETE: 'SEARCH_COMPLETE',
    SEARCH_FAIL: 'SEARCH_FAIL',
};

export const creators = {
    query: createAction(types.SEARCH_QUERY, query => query),
    mode: createAction(types.SEARCH_MODE, mode => mode),
    addToList: createAction(types.SEARCH_LIST_ADD, item => item),
    removeFromList: createAction(types.SEARCH_LIST_REMOVE, index => index),
    showList: createAction(types.SEARCH_LIST_SHOW),
    hideList: createAction(types.SEARCH_LIST_HIDE),
    enabled: createAction(types.SEARCH_ENABLED),
    disabled: createAction(types.SEARCH_DISABLED),
    reset: createAction(types.SEARCH_RESET),
    start: createAction(types.SEARCH_START),
    complete: createAction(types.SEARCH_COMPLETE),
    fail: createAction(types.SEARCH_FAIL),
};
