import {
    types
} from 'state/actions/basic';

const {
    BASIC_START,
    BASIC_COMPLETE,
    BASIC_FAIL,
} = types;

export const initial_state = {
    loading: false,
    failed: false,
    count: 0,
};

const actionsMap = {
    [BASIC_START]: (state) => {
        return { 
            ...state,
            loading: true,
            failed: false,
        };
    },
    [BASIC_COMPLETE]: (state) => {
        return { 
            ...state,
            loading: false,
            failed: false,
            count: state.count + 1,
        };
    },
    [BASIC_FAIL]: (state) => {
        return { 
            ...state,
            loading: false,
            failed: true,
        };
    },
};

export default function reducer(state = initial_state, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
