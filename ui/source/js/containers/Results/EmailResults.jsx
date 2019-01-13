import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EmailResults extends Component {
    static propTypes = {
        active: PropTypes.bool,
        email_addresses: PropTypes.array,
        results: PropTypes.object,
    }

    static defaultProps = {
        active: false,
        email_addresses: [],
        results: {},
    };

    render () {
        const {
            active, email_addresses, results
        } = this.props;

        const emails_results = email_addresses.map((email_address, index) => {
            const count = results[email_address].length;

            return (
                <div key={`email-result-${index}`}>
                    <h3>{email_address}</h3>
                    <h4>{`${count} breached site${count === 1 ? '' : 's'}`}</h4>
                </div>
            );
        });
        
        return (
            <div className={`container ${active ? '' : ' invisible'}`}>
                { emails_results }
            </div>
        );
    }
}

export default connect(
    state => ({
        active: state.email.active,
        email_addresses: state.email.email_addresses,
        results: state.email.results,
    }),
)(EmailResults);