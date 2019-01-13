import { takeEvery, put, select, call } from 'redux-saga/effects';

import api from 'lib/ApiClient';

import { types as search_action_types, creators as search_actions } from 'state/actions/search';

export function* watchSearch() {
    yield takeEvery(search_action_types.SEARCH_START, performSearch);
}

export function* performSearch () {
    console.log('performSearch');
    const { mode, query, query_list } = yield select(state => state.search);

    try {
        if (mode === 'email') {
            yield call(performEmailSearch, query, query_list);
        } else if (mode === 'password') {
            yield call(performPasswordSearch, query);
        }
    } catch (e) {
        console.error(e);
        yield put(search_actions.fail());
    }
}

function* performEmailSearch (query, query_list) {
    console.log('performEmailSearch');
    let email_addresses = [];
    if (query_list.length > 0) {
        email_addresses = [...query_list];
    } else {
        email_addresses.push(query);
    }

    const result = yield api.searchEmail(email_addresses);
    console.log('performEmailSearch - result' , result);
    if (result.success) {
        //TODO Push results to state
        yield put(search_actions.complete());
    } else {
        throw 'performEmailSearch Request failed';
    }
}

function* performPasswordSearch (query) {
    console.log('performPasswordSearch');
    const result = yield api.searchPassword(query);
    console.log('performPasswordSearch - result' , result);
    if (result.success) {
        //TODO Push results to state
        yield put(search_actions.complete());
    } else {
        throw 'performPasswordSearch Request failed';
    }
}