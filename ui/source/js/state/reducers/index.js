import { combineReducers } from 'redux';

import basic from 'state/reducers/basic';
import breaches from 'state/reducers/breaches';
import email from 'state/reducers/email';
import password from 'state/reducers/password';
import search from 'state/reducers/search';

export default combineReducers({
    basic,
    breaches,
    email,
    password,
    search,
});
