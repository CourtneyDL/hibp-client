import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

        //TODO Link to breach view
        return (
            <div>
                <img src={logo} alt={title} />
                <h4>{title}</h4>
            </div>
        );
    }
}