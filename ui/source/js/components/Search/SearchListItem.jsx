import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchListItem extends Component {
    static propTypes = {
        children: PropTypes.string,
        index: PropTypes.number,
        disabled: PropTypes.bool,

        onDeleteClick: PropTypes.func,
    }

    static defaultProps = {
        children: '[LIST ITEM]',
        index: 0,
        disabled: false,

        onDeleteClick: () => {},
    };

    onDeleteClick = () => {
        this.props.onDeleteClick(this.props.index);
    }

    render () {
        const {
            children, disabled
        } = this.props;

        return (
            <div>
                <button className="btn btn-danger" disabled={disabled} onClick={this.onDeleteClick}>Delete</button>
                <span>{children}</span>
            </div>
        );
    }
}