import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BreachTile from 'components/Results/BreachTile';

export default class EmailResult extends Component {
    static propTypes = {
        breaches: PropTypes.array,
        emailAddress: PropTypes.string,
        expanded: PropTypes.bool,
        hideToggle: PropTypes.bool,
        toggle: PropTypes.func,
    }

    static defaultProps = {
        breaches: [],
        emailAddress: '[EMAIL ADDRESS]',
        expanded: false,
        hideToggle: false,
        toggle: () => {},
    };

    onToggleClick = () => {
        if (!this.props.hideToggle) {
            this.props.toggle(this.props.emailAddress);
        }
    }

    render () {
        const {
            emailAddress:email_address, breaches, expanded, hideToggle:hide_toggle
        } = this.props;

        const count = breaches.length;

        const rendered_breaches = breaches.map((breach, index) => (
            <BreachTile key={`breach-tile-${index}`} logo={breach.logo} title={breach.title} name={breach.name} />
        ));

        return (
            <div className="item item--email-result-container">
                <div className="item item--flex item--email-result" onClick={this.onToggleClick}>
                    <div className="item__title">
                        <h3>{email_address}</h3>
                        <h4>{`${count} breached site${count === 1 ? '' : 's'}`}</h4>
                    </div>
                    { hide_toggle ? null : <div className="btn btn-secondary item__btn item__btn--email-result">{expanded ? 'Close' : 'Open'}</div> }
                </div>
                <div className={expanded ? '' : 'd-none'}>
                    { rendered_breaches }
                </div>
            </div>
        );
    }
}