import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BreachTile from 'components/Results/BreachTile';

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

        const rendered_breaches = breaches.map((breach, index) => (
            <BreachTile key={`breach-tile-${index}`} logo={breach.logo} title={breach.title} name={breach.name} />
        ));

        return (
            <div>
                <h3>{email_address}</h3>
                <h4>{`${count} breached site${count === 1 ? '' : 's'}`}</h4>
                <div>
                    { rendered_breaches }
                </div>
            </div>
        );
    }
}