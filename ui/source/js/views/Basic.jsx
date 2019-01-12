import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { creators as basic_actions } from 'state/actions/basic';

import HelloWorld from 'components/Basic/HelloWorld';
import Counter from 'components/Basic/Counter';

class Basic extends Component {
    static propTypes = {
        count: PropTypes.number,
        failed: PropTypes.bool,
        loading: PropTypes.bool,
        start: PropTypes.func,
    }

    static defaultProps = {
        count: 0,
        failed: false,
        loading: false,
        start: () => {},
    };

    onButtonClick = () => this.props.start();

    render () {
        const { count, failed, loading } = this.props;

        return (
            <div className="container">
                <HelloWorld/>
                <Counter {...{ count, failed }}/>
                <button
                    className="btn btn-success"
                    disabled={loading}
                    onClick={this.onButtonClick}
                    >Press me!</button>
            </div>
        );
    }
}

export default connect(
    state => ({
        count: state.basic.count,
        failed: state.basic.failed,
        loading: state.basic.loading,
    }),
    dispatch => ({
        start: () => dispatch(basic_actions.start()),
    })
)(Basic);