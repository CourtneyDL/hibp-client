import { combineReducers } from 'redux';

import basic from 'state/reducers/basic';
import search from 'state/reducers/search';

export default combineReducers({
    basic,
    search,
});
