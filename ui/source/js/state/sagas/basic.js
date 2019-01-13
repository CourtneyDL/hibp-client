import { takeEvery, put } from 'redux-saga/effects';

import api from 'lib/ApiClient';

import { types as basic_action_types, creators as basic_actions } from 'state/actions/basic';

export function* watchBasic() {
    yield takeEvery(basic_action_types.BASIC_START, loadBasic);
}

export function* loadBasic () {
    try {
        const result = yield api.test();
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