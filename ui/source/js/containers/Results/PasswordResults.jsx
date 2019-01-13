import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PasswordResults extends Component {
    static propTypes = {
        active: PropTypes.bool,
        count: PropTypes.number,
    }

    static defaultProps = {
        active: false,
        count: 0,
    };

    render () {
        const {
            active, count
        } = this.props;
        let main_message = '';
        let sub_message = '';

        if (count === 0) {
            main_message = 'Good news - No pwnage found!';
            sub_message = 'Congratulations for having such an awesome password.';
        } else {
            main_message = 'Uh oh - You\'ve been pwned!';
            sub_message = `This password has been seen ${count} time${count === '1' ? '' : 's'}.`;
        }

        return (
            <div className={`box box--results box--password-results results results--password ${active ? '' : ' d-none'}`}>
                <h2 className="text-center results__main-title">{main_message}</h2>
                <h3 className="text-center results__sub-title">{sub_message}</h3>
            </div>
        );
    }
}

export default connect(
    state => ({
        active: state.password.active,
        count: state.password.count,
    }),
)(PasswordResults);