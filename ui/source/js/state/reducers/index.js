import { combineReducers } from 'redux';

import basic from 'state/reducers/basic';
import password from 'state/reducers/password';
import search from 'state/reducers/search';

export default combineReducers({
    basic,
    password,
    search,
});
