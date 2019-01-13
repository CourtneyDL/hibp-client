import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { creators as search_actions } from 'state/actions/search';

import SearchListItem from 'components/Search/SearchListItem';
import { STATUS_CODES } from 'http';

class SearchList extends Component {
    static propTypes = {
        mode: PropTypes.string,
        query_list: PropTypes.array,
        disabled: PropTypes.bool,
        show_list: PropTypes.bool,
        removeFromList: PropTypes.func,
    };

    static defaultProps = {
        mode: 'email',
        query_list: [],
        show_list: true,
        disabled: false,
        removeFromList: () => {},
    };

    onSearchClick = () => this.props.start();

    render () {
        const {
            mode, query_list, disabled, removeFromList,
        } = this.props;

        const list_items = query_list.map((item, index) => (
            <SearchListItem 
                key={`item-${index}`}
                {...{ index, disabled, onDeleteClick:removeFromList }}
                >{item}</SearchListItem>
        ));

        const show_list = mode === 'email' && this.props.show_list && list_items.length > 0;

        return (
            <div className={`container${show_list ? '' : ' invisible'}`}>
                <h3>Searching pwnage for</h3>
                <div>
                    { list_items }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        mode: state.search.mode,
        query_list: state.search.query_list,
        disabled: state.search.disabled,
        show_list: state.search.show_list,
    }),
    dispatch => ({
        removeFromList: index => dispatch(search_actions.removeFromList(index)),
    })
)(SearchList);