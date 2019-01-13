import axios from 'axios';
import _ from 'lodash/object';

const base_url = window.location.origin === 'http://localhost:3000' ? 'http://localhost:4000' : window.location.origin;

const makeRequest = (endpoint, data) => {
    return axios.post(`${base_url}${endpoint}`, data)
        .then(result => _.get(result, 'data', { success: false }));
};

export const searchPassword = (password) => makeRequest('/search/password', { password });
export const searchEmail = (email_addresses) => makeRequest('/search/email', { email_addresses });

export const test = () => makeRequest('/test');

export default {
    test,
    searchEmail,
    searchPassword,
};