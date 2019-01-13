import {
    types
} from 'state/actions/breaches';

const {
    BREACHES_START,
    BREACHES_UPDATE,
    BREACHES_COMPLETE,
    BREACHES_FAIL,
} = types;

export const initial_state = {
    loading: false,
    failed: false,
    data: {}
};

const actionsMap = {
    [BREACHES_START]: (state) => {
        return { 
            ...state,
            loading: true,
            failed: false,
        };
    },
    [BREACHES_UPDATE]: (state, { payload:breaches }) => {
        return {
            ...state,
            data: { ...state.data, ...breaches },
        };
    },
    [BREACHES_COMPLETE]: (state) => {
        return { 
            ...state,
            loading: false,
            failed: false
        };
    },
    [BREACHES_FAIL]: (state) => {
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
