import { takeEvery, put, select, call } from 'redux-saga/effects';

import api from 'lib/ApiClient';

import { creators as email_actions } from 'state/actions/email';
import { creators as password_actions } from 'state/actions/password';
import { types as search_action_types, creators as search_actions } from 'state/actions/search';

export function* watchSearch() {
    yield takeEvery(search_action_types.SEARCH_START, performSearch);
}

export function* performSearch () {
    console.log('performSearch');
    
    //Reset results UI
    yield put(email_actions.reset());
    yield put(password_actions.reset());

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

    //Add current search term to list if a list is present
    if (query_list.length > 0 && !query_list.includes(query)) {
        yield put(search_actions.addToList(query));
        query_list = yield select(state => state.search.query_list);
    }

    let email_addresses = [];
    if (query_list.length > 0) {
        email_addresses = [...query_list];
    } else {
        email_addresses.push(query);
    }

    const response = yield api.searchEmail(email_addresses);
    console.log('performEmailSearch - response' , response);
    if (response.success) {
        yield put(email_actions.update(response.result));
        yield put(search_actions.complete());
    } else {
        throw 'performEmailSearch Request failed';
    }
}

function* performPasswordSearch (query) {
    console.log('performPasswordSearch');
    const response = yield api.searchPassword(query);
    console.log('performPasswordSearch - response' , response);
    if (response.success) {
        yield put(password_actions.update(response.result));
        yield put(search_actions.complete());
    } else {
        throw 'performPasswordSearch Request failed';
    }
}