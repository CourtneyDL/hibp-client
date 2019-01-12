import axios from 'axios';
import _object from 'lodash/object';

const base_url = window.location.origin === 'http://localhost:3000' ? 'http://localhost:4000' : window.location.origin;

const makeRequest = (endpoint) => {
    return axios.post(`${base_url}${endpoint}`)
        .then(result => _object.get(result, 'data', { success: false }));
};

export const test = () => makeRequest('/test');

export default {
    test,
};