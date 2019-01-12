import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import 'bootstrap';

import App from 'views/App';
import store from 'state/store';

// Load SCSS
import '../scss/main.scss'; 

// Render it to DOM
ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
