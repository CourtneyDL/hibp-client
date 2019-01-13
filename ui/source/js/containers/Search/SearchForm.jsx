import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { creators as search_actions } from 'state/actions/search';

import SearchInput from 'components/Search/SearchInput';
import SearchModes from 'components/Search/SearchModes';

class SearchForm extends Component {
    static propTypes = {
        query: PropTypes.string,
        mode: PropTypes.string,
        disabled: PropTypes.bool,

        updateQuery: PropTypes.func,
        updateMode: PropTypes.func,
        addToList: PropTypes.func,
        start: PropTypes.func,
        reset: PropTypes.func,
    }

    static defaultProps = {
        query: '',
        mode: 'email',
        disabled: false,

        updateQuery: () => {},
        updateMode: () => {},
        addToList: () => {},
        start: () => {},
        reset: () => {},
    };

    render () {
        const {
            query, mode, disabled,
            updateQuery, updateMode, addToList, start, reset
        } = this.props;

        return (
            <div className="container">
                <SearchInput {...{ query, mode, disabled, updateQuery, addToList, start, reset }}/>
                <SearchModes {...{ mode, disabled, updateMode }}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        query: state.search.query,
        mode: state.search.mode,
        disabled: state.search.disabled,
    }),
    dispatch => ({
        updateQuery: query => dispatch(search_actions.query(query)),
        updateMode: mode => dispatch(search_actions.mode(mode)),
        addToList: query => dispatch(search_actions.addToList(query)),
        start: () => dispatch(search_actions.start()),
        reset: () => dispatch(search_actions.reset()),
    })
)(SearchForm);