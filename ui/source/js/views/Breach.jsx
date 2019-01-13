import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash/object';
import { NavLink } from 'react-router-dom';

import { creators as breach_actions } from 'state/actions/breaches';

import BreachInfo from 'components/Breach/BreachInfo';

class Breach extends Component {
    static propTypes = {
        breach: PropTypes.object,
        failed: PropTypes.bool,
        loading: PropTypes.bool,
        name: PropTypes.string,
        start: PropTypes.func,
        complete: PropTypes.func,
    }

    static defaultProps = {
        breach: null,
        failed: false,
        loading: false,
        name: '',
        start: () => {},
        complete: () => {},
    };

    componentWillMount() {
        const { name, breach, start, complete } = this.props;
        if (breach) {
            complete();
        } else if (name) {
            start(name);
        }
    }

    render () {
        const { failed, loading, breach } = this.props;

        return (
            <div className="container">
                <NavLink className="btn btn-secondary" to="/">Back to Search</NavLink>
                {loading ? <div className="alert alert-info">Loading...</div> : null}
                {failed ? <div className="alert alert-danger">Information could not be found for this breach</div> : null}
                {breach ? 
                    <BreachInfo {...{ breach }}/>
                    : null
                }
            </div>
        );
    }
}

export default connect(
    (state, own_props) => {
        const name = own_props.match.params.name;
        return {
            failed: state.breaches.failed,
            loading: state.breaches.loading,
            name,
            breach: _.get(state, `breaches.data['${name}']`, null),
        };
    },
    (dispatch) => ({
        start: (name) => dispatch(breach_actions.start(name)),
        complete: () => dispatch(breach_actions.complete()),
    })
)(Breach);