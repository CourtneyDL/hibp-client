import axios from 'axios';
import _ from 'lodash/object';

const base_url = window.location.origin === 'http://localhost:3000' ? 'http://localhost:4000' : window.location.origin;

const makeGETRequest = endpoint => makeRequest('get', endpoint);
const makePOSTRequest = (endpoint, data) => makeRequest('post', endpoint, data);
const makeRequest = (type, endpoint, data) => {
    return axios[type](`${base_url}${endpoint}`, data)
        .then(result => _.get(result, 'data', { success: false }));
};

export const getBreach = name => makeGETRequest(`/breach/${name}`);
export const searchPassword = password => makePOSTRequest('/search/password', { password });
export const searchEmail = email_addresses => makePOSTRequest('/search/email', { email_addresses });

export const test = () => makePOSTRequest('/test');

export default {
    test,
    getBreach,
    searchEmail,
    searchPassword,
};