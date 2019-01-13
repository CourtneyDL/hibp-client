import { watchBasic } from 'state/sagas/basic';
import { watchBreaches } from 'state/sagas/breaches';
import { watchSearch } from 'state/sagas/search';

export default function* rootSaga () {
    yield [
        watchBasic(),
        watchBreaches(),
        watchSearch(),
    ]
}