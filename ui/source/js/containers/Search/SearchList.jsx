import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { creators as search_actions } from 'state/actions/search';

import SearchListItem from 'components/Search/SearchListItem';

class SearchList extends Component {
    static propTypes = {
        mode: PropTypes.string,
        query_list: PropTypes.array,
        disabled: PropTypes.bool,
        show_list: PropTypes.bool,
        results_active: PropTypes.bool,
        removeFromList: PropTypes.func,
        showList: PropTypes.func,
        hideList: PropTypes.func,
    };

    static defaultProps = {
        mode: 'email',
        query_list: [],
        show_list: true,
        disabled: false,
        results_active: false,
        removeFromList: () => {},
        showList: () => {},
        hideList: () => {},
    };

    onShowClick = () => this.props.showList();
    onHideClick = () => this.props.hideList();

    render () {
        const {
            mode, query_list, disabled, removeFromList, results_active
        } = this.props;

        const list_items = query_list.map((item, index) => (
            <SearchListItem 
                key={`item-${index}`}
                {...{ index, disabled, onDeleteClick:removeFromList }}
                >{item}</SearchListItem>
        ));

        const show_list = mode === 'email' && this.props.show_list && list_items.length > 0;

        return (
            <div className="container">
                <div className={`container${show_list ? '' : ' d-none'}`}>
                    <h3>Searching pwnage for</h3>
                    <div>
                        { list_items }
                    </div>
                </div>
                <div className={`container${list_items.length > 0 && results_active ? '' : ' d-none'}`}>
                    { this.props.show_list ? 
                        <div className="btn btn-secondary" onClick={this.onHideClick}>Hide Email List</div>
                        :
                        <div className="btn btn-secondary" onClick={this.onShowClick}>Show Email List</div>
                    }
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
        results_active: state.email.active || state.password.active,
    }),
    dispatch => ({
        removeFromList: index => dispatch(search_actions.removeFromList(index)),
        hideList: () => dispatch(search_actions.hideList()),
        showList: () => dispatch(search_actions.showList()),
    })
)(SearchList);