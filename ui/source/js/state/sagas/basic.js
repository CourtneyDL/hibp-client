import { takeEvery, put } from 'redux-saga/effects';

import api from 'lib/ApiClient';

import { types as basic_action_types, creators as basic_actions } from 'state/actions/basic';

export function* watchBasic() {
    yield takeEvery(basic_action_types.BASIC_START, loadBasic);
}

export function* loadBasic () {
    console.log('loadBasic #1');
    try {
        console.log('loadBasic #2');
        const result = yield api.test();
        console.log('loadBasic #3');
        console.log('api result', result);
        if (result.success) {
            yield put(basic_actions.complete());
        } else {
            throw 'Request failed';
        }
    } catch (e) {
        console.error(e);
        yield put(basic_actions.fail());
    }
}