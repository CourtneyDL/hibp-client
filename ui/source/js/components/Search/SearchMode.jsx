import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchMode extends Component {
    static propTypes = {
        children: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        value: PropTypes.string,

        onChange: PropTypes.func,
    }

    static defaultProps = {
        children: '[MODE]',
        checked: false,
        disabled: false,
        value: 'mode',

        onChange: () => {},
    };

    onChange = e => this.props.onChange(e.currentTarget.value);

    render () {
        const {
            children, checked, disabled, value
        } = this.props;

        return (
            <div className="form-check form-check-inline search-mode">
                <input 
                    className="form-check-input search-mode__input" 
                    type="radio" name="mode"
                    id={`search_mode_${value}`}
                    onChange={this.onChange}
                    {...{ checked, disabled, value }} />
                <label className="form-check-label search-mode__label" htmlFor={`search_mode_${value}`}>{children}</label>
            </div>
        );
    }
}