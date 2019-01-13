import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchInput extends Component {
    static propTypes = {
        query: PropTypes.string,
        mode: PropTypes.string,
        disabled: PropTypes.bool,
        updateQuery: PropTypes.func,
        addToList: PropTypes.func,
        start: PropTypes.func,
        reset: PropTypes.func,
    }

    static defaultProps = {
        query: '',
        mode: '',
        disabled: false,
        updateQuery: () => {},
        addToList: () => {},
        start: () => {},
        reset: () => {},
    };

    onKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSearchClick();
        }
    }

    onChange = e => this.props.updateQuery(e.currentTarget.value);

    onAddClick = () => this.props.addToList(this.props.query);
    onSearchClick = () => this.props.start();
    onResetClick = () => this.props.reset();

    render () {
        const {
            query, mode, disabled
        } = this.props;

        let placeholder;
        switch (mode) {
            case 'email':
                placeholder = 'Enter an email address';
                break;
            case 'password':
                placeholder = 'Enter a password';
                break;
            default:
                placeholder = 'Enter a value';
                break;
        }

        return (
            <div className="input-group">
                <input type="text" className="form-control" 
                    {...{ placeholder, disabled }}
                    value={query} onChange={this.onChange} onKeyUp={this.onKeyUp}/>
                <span className="input-group-btn">
                    <button className="btn btn-secondary" type="button" disabled={disabled} onClick={this.onAddClick}>Add to List</button>
                    <button className="btn btn-primary" type="button" disabled={disabled} onClick={this.onSearchClick}>Search</button>
                    <button className="btn btn-danger" type="button" disabled={disabled} onClick={this.onResetClick}>Reset</button>
                </span>
            </div>
        );
    }
}