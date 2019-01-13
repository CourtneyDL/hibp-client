import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BreachTile from 'components/Results/BreachTile';

export default class EmailResult extends Component {
    static propTypes = {
        emailAddress: PropTypes.string,
        expanded: PropTypes.bool,
        breaches: PropTypes.array,
        toggle: PropTypes.func,
    }

    static defaultProps = {
        emailAddress: '[EMAIL ADDRESS]',
        expanded: false,
        breaches: [],
        toggle: () => {},
    };

    // onToggleClick = () => this.props.toggle(this.props.emailAddress);
    onToggleClick = () => {
        console.log(`onToggleClick[${this.props.emailAddress}]`);
        this.props.toggle(this.props.emailAddress);
    }

    render () {
        const {
            emailAddress:email_address, breaches, expanded
        } = this.props;

        const count = breaches.length;

        const rendered_breaches = breaches.map((breach, index) => (
            <BreachTile key={`breach-tile-${index}`} logo={breach.logo} title={breach.title} name={breach.name} />
        ));

        return (
            <div>
                <div onClick={this.onToggleClick}>
                    <h3>{email_address}</h3>
                    <h4>{`${count} breached site${count === 1 ? '' : 's'}`}</h4>
                    <div className="btn btn-secondary">{expanded ? 'Close' : 'Open'}</div>
                </div>
                <div className={expanded ? '' : 'd-none'}>
                    { rendered_breaches }
                </div>
            </div>
        );
    }
}