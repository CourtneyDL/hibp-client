import {
    types
} from 'state/actions/search';

const {
    SEARCH_QUERY,
    SEARCH_MODE,
    SEARCH_LIST_ADD,
    SEARCH_LIST_REMOVE,
    SEARCH_LIST_SHOW,
    SEARCH_LIST_HIDE,
    SEARCH_ENABLED,
    SEARCH_DISABLED,
    SEARCH_RESET,
    SEARCH_START,
    SEARCH_COMPLETE,
    SEARCH_FAIL,
} = types;

export const initial_state = {
    query: '',
    mode: 'email',
    query_list: [],
    disabled: false,
    show_list: false,
    failed: false,
};

const actionsMap = {
    [SEARCH_QUERY]: (state, {payload:query=''}) => {
        return { 
            ...state,
            query,
        };
    },
    [SEARCH_MODE]: (state, {payload:mode=''}) => {
        //A valid mode change will reset the search form
        let query = '';
        let query_list = [];
        let show_list = false;
        
        //Retain current mode and form data if action mode is invalid or mode hasn't changed
        if (mode === state.mode || !['email', 'password'].includes(mode)) {
            mode = state.mode;
            query = state.query;
            query_list = state.query_list;
            show_list = state.show_list;
        }

        return { 
            ...state,
            mode,
            query,
            query_list,
            show_list,
        };
    },
    [SEARCH_LIST_ADD]: (state, {payload:item=''}) => {
        const query_list = [...state.query_list];
        if (item.length > 0 && !query_list.includes(item)) {
            query_list.push(item);
        }

        return { 
            ...state,
            query_list,
            //TEMP - When there are search results showing the list could be trigger by a saga
            show_list: true,
        };
    },
    [SEARCH_LIST_REMOVE]: (state, {payload:index}) => {
        const query_list = [...state.query_list];
        query_list.splice(index, 1);

        return { 
            ...state,
            query_list,
        };
    },
    [SEARCH_LIST_SHOW]: (state) => {
        return { 
            ...state,
            show_list: true,
        };
    },
    [SEARCH_LIST_HIDE]: (state) => {
        return { 
            ...state,
            show_list: false,
        };
    },
    [SEARCH_ENABLED]: (state) => {
        return { 
            ...state,
            disabled: false,
        };
    },
    [SEARCH_DISABLED]: (state) => {
        return { 
            ...state,
            disabled: true,
        };
    },
    [SEARCH_RESET]: () => {
        return { 
            ...initial_state,
        };
    },
    [SEARCH_START]: (state) => {
        return { 
            ...state,
            disabled: true,
            failed: false,
        };
    },
    [SEARCH_COMPLETE]: (state) => {
        return { 
            ...state,
            disabled: false,
            failed: false,
        };
    },
    [SEARCH_FAIL]: (state) => {
        return { 
            ...state,
            disabled: false,
            failed: true,
        };
    },
};

export default function reducer(state = initial_state, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
