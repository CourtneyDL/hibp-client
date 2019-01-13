import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchModes extends Component {
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

    render () {
        const {
            children, checked, value, onChange
        } = this.props;

        return (
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" name="mode"
                    id={`search_mode_${value}`}
                    {...{ checked, value, onChange }} />
                <label className="form-check-label" htmlFor={`search_mode_${value}`}>{children}</label>
            </div>
        );
    }
}