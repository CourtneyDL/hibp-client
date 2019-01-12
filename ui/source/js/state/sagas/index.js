import { watchBasic } from 'state/sagas/basic';

export default function* rootSaga () {
    yield [
        watchBasic(),
    ]
}