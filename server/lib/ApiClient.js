const axios = require('axios');

class ApiClent {
    constructor (base_url = 'https://haveibeenpwned.com/api/v2/') {
        this.base_url = base_url;
    }

    getURL () {
        return this.base_url;
    }

    prepareRequestBody () {
        return;
    }

    async makeRequest (url = this.getURL()) {
        return axios.get(url, {
            headers: {
                'User-Agent': 'hibp-client-courtneydl',
            },
            validateStatus: status => (status >= 200 && status < 300) || status === 404,
        });
    }

    processResponse ({ data }) {
        return data;
    }

    async complete () {
        const response_data = await this.makeRequest();

        return this.processResponse(response_data);
    };
};

module.exports = ApiClent;