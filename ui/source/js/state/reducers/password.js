import {
    types
} from 'state/actions/password';

const {
    PASSWORD_UPDATE,
    PASSWORD_RESET,
} = types;

export const initial_state = {
    active: false,
    count: 0,
};

const actionsMap = {
    [PASSWORD_UPDATE]: (state, { payload:count }) => {
        return { 
            ...state,
            active: true,
            count,
        };
    },
    [PASSWORD_RESET]: () => {
        return { 
            ...initial_state,
        };
    },
};

export default function reducer(state = initial_state, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
