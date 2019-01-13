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
            <div className="item item--breach-tile breach-tile breach-tile--results">
                <NavLink className="breach-tile__link" to={`/breach/${name}`}>
                    <div className="breach-tile__image-outer">
                        <div className="breach-tile__image" style={{backgroundImage: `url('${logo}')`}} alt={title} />
                    </div>
                    <h4 className="breach-tile__title">{title}</h4>
                </NavLink>
            </div>
        );
    }
}