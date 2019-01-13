import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EmailResult extends Component {
    static propTypes = {
        emailAddress: PropTypes.string,
        breaches: PropTypes.array,
    }

    static defaultProps = {
        emailAddress: '[EMAIL ADDRESS]',
        breaches: [],
    };

    render () {
        const {
            emailAddress:email_address, breaches,
        } = this.props;

        const count = breaches.length;

        return (
            <div>
                <h3>{email_address}</h3>
                <h4>{`${count} breached site${count === 1 ? '' : 's'}`}</h4>
            </div>
        );
    }
}