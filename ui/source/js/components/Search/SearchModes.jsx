import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchMode from 'components/Search/SearchMode';

export default class SearchModes extends Component {
    static propTypes = {
        mode: PropTypes.string,
        disabled: PropTypes.bool,

        updateMode: PropTypes.func,
    }

    static defaultProps = {
        mode: 'email',
        disabled: false,

        updateMode: () => {},
    };

    onChange = e => this.props.updateMode(e.currentTarget.value);

    render () {
        const {
            mode, disabled, onChange
        } = this.props;

        return (
            <div className="container">
                <SearchMode value="email" {...{disabled, onChange}} checked={mode === 'email'}>Email</SearchMode>
                <SearchMode value="password" {...{disabled, onChange}} checked={mode === 'password'}>Password</SearchMode>
            </div>
        );
    }
}