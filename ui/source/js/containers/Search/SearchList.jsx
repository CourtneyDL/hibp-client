import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { creators as search_actions } from 'state/actions/search';

import SearchListItem from 'components/Search/SearchListItem';

class SearchList extends Component {
    static propTypes = {
        query_list: PropTypes.array,
        disabled: PropTypes.bool,
        removeFromList: PropTypes.func,
    };

    static defaultProps = {
        query_list: [],
        disabled: false,
        removeFromList: () => {},
    };

    onSearchClick = () => this.props.start();

    render () {
        const {
            query_list, disabled, removeFromList,
        } = this.props;

        const list_items = query_list.map((item, index) => (
            <SearchListItem 
                key={`item-${index}`}
                {...{ index, disabled, onDeleteClick:removeFromList }}
                >{item}</SearchListItem>
        ));

        return (
            <div className="container">
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
        query_list: state.search.query_list,
        disabled: state.search.disabled,
    }),
    dispatch => ({
        removeFromList: index => dispatch(search_actions.removeFromList(index)),
    })
)(SearchList);