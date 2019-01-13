import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash/object';

import EmailResult from 'components/Results/EmailResult';

class EmailResults extends Component {
    static propTypes = {
        active: PropTypes.bool,
        results: PropTypes.array,
    }

    static defaultProps = {
        active: false,
        results: [],
    };

    render () {
        const {
            active, results
        } = this.props;

        const emails_results = results.map((result, index) => {
            return (
                <EmailResult key={`email-result-${index}`} emailAddress={result.email_address} breaches={result.breaches}/>
            );
        });
        
        return (
            <div className={`container ${active ? '' : ' d-none'}`}>
                { emails_results }
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
                breaches
            };
        });
        
        return {
            active: state.email.active,
            results,
        }
    }
)(EmailResults);