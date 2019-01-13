import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash/object';

import EmailResult from 'components/Results/EmailResult';

import { creators as email_actions } from 'state/actions/email';

class EmailResults extends Component {
    static propTypes = {
        active: PropTypes.bool,
        results: PropTypes.array,
        toggle: PropTypes.func,
    }

    static defaultProps = {
        active: false,
        results: [],
        toggle: () => {},
    };

    render () {
        const {
            active, results, toggle
        } = this.props;

        const email_results = results.map((result, index) => {
            return (
                <EmailResult key={`email-result-${index}`} 
                    emailAddress={result.email_address} breaches={result.breaches}
                    expanded={result.expanded} toggle={toggle}
                    hideToggle={results.length === 1}/>
            );
        });
        
        return (
            <div className={`container ${active ? '' : ' d-none'}`}>
                { email_results }
            </div>
        );
    }
}

export default connect(
    state => {
        const email_addresses = state.email.email_addresses;

        const results = email_addresses.map((email_address) => {
            const breach_names = _.get(state, `email.results['${email_address}']`, []);
            const breaches = breach_names.map(breach => {
                const { Name:name, Title:title, LogoPath:logo } = state.breaches.data[breach];
                return { name, title, logo };
            });

            return {
                email_address,
                breaches,
                expanded: _.get(state, `email.expanded_view['${email_address}']`, false),
            };
        });
        
        return {
            active: state.email.active,
            results,
        }
    },
    dispatch => ({
        toggle: (email_address) => dispatch(email_actions.toggle(email_address)),
    })
)(EmailResults);