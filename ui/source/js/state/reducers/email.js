import _collection from 'lodash/collection';

import {
    types
} from 'state/actions/email';

const {
    EMAIL_UPDATE,
    EMAIL_RESULT_TOGGLE,
    EMAIL_RESET,
} = types;

export const initial_state = {
    active: false,
    email_addresses: [],
    results: {},
    expanded_view: {},
};

const actionsMap = {
    [EMAIL_UPDATE]: (state, { payload:results }) => {
        const email_addresses = Object.keys(results);
        const expanded_view = email_addresses.reduce((view_obj, email_address) => {
            return { ...view_obj, [email_address]:false };
        }, {});

        return { 
            ...state,
            active: true,
            email_addresses,
            results,
            expanded_view,
        };
    },
    [EMAIL_RESULT_TOGGLE]: (state, { payload:email_address }) => {
        const expanded_view = { ...state.expanded_view };

        if (typeof expanded_view[email_address] !== 'undefined'){
            expanded_view[email_address] = !expanded_view[email_address];
        }

        return { 
            ...state,
            expanded_view,
        };
    },
    [EMAIL_RESET]: () => {
        return { 
            ...initial_state,
        };
    },
};

export default function reducer(state = initial_state, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
