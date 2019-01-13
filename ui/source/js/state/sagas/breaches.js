import { takeEvery, put } from 'redux-saga/effects';

import api from 'lib/ApiClient';

import { types as breach_action_types, creators as breach_actions } from 'state/actions/breaches';

export function* watchBreaches() {
    yield takeEvery(breach_action_types.BREACHES_START, loadBreach);
}

export function* loadBreach ({ payload:name }) {
    console.log(`loadBreach[${name}]`);
    try {
        const response = yield api.getBreach(name);
        if (response.success) {
            yield put(breach_actions.update({ [response.result.Name]: response.result }));
            yield put(breach_actions.complete());
        } else {
            throw 'Request failed';
        }
    } catch (e) {
        console.error(e);
        yield put(breach_actions.fail());
    }
}