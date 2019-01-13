import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Basic from 'views/Basic';
import Search from 'views/Search';

const public_path = '/';
let base_name = '/';
if (PUBLIC_URL && PUBLIC_URL !== base_name) {
    base_name = PUBLIC_URL.replace(location.origin,'');
}

export const route_codes = {
    SEARCH: public_path,
    BASIC: `${public_path}test`,
};

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object,
    }

    render() {
        return (
            <BrowserRouter basename={base_name}>
                <div>
                    <h2>have I been pwned?</h2>
                    <div>
                        <Switch>
                            <Route exact path={ route_codes.BASIC } component={ Basic } />
                            <Route exact path={ route_codes.SEARCH } component={ Search } />
                            <Redirect to={ route_codes.SEARCH }/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
