import { watchBasic } from 'state/sagas/basic';
import { watchSearch } from 'state/sagas/search';

export default function* rootSaga () {
    yield [
        watchBasic(),
        watchSearch(),
    ]
}