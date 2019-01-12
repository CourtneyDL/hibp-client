import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Basic from 'views/Basic';

const public_path = '/';
let base_name = '/';
if (PUBLIC_URL && PUBLIC_URL !== base_name) {
    base_name = PUBLIC_URL.replace(location.origin,'');
}

export const route_codes = {
    BASIC: public_path,
    // SEARCH: `${public_path}search`,
};

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
    }

    render() {
        return (
            <BrowserRouter basename={base_name}>
                <div>
                    <Switch>
                        <Route exact path={ route_codes.BASIC } component={ Basic } />
                        <Redirect to={ route_codes.BASIC }/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
