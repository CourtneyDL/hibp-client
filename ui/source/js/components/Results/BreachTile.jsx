import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class BreachTile extends Component {
    static propTypes = {
        name: PropTypes.string,
        logo: PropTypes.string,
        title: PropTypes.string,
    }

    static defaultProps = {
        name: '',
        logo: '',
        title: '[BREACH TITLE]',
    };

    render () {
        const {
            name, logo, title
        } = this.props;

        return (
            <div>
                <NavLink to={`/breach/${name}`}>
                    <img src={logo} alt={title} />
                    <h4>{title}</h4>
                </NavLink>
            </div>
        );
    }
}