const axios = require('axios');
const ApiClient = require('./ApiClient');

class EmailCheckClient extends ApiClient {
    constructor (email_addresses) {
        super('https://haveibeenpwned.com/api/v2/breachedaccount/');

        this.email_addresses = email_addresses;
        this.response_data = {};
        this.success = false;
    }

    getURL (email_address) {
        return `${super.getURL()}${email_address}`;
    }

    async makeRequest (url = this.getURL()) {
        return axios.get(url, {
            headers: {
                'User-Agent': 'hibp-client-courtneydl',
            }
        });
    }

    processResponse () {
        const self = this;

        const result = this.email_addresses.reduce((output, email_address) => {
            const response_data = self.response_data[email_address] || [];
            
            output.email_addresses[email_address] = response_data.map(breach => breach.Name);
            response_data.forEach(breach => output.breaches[breach.Name] = breach);

            return output;
        }, {
            email_addresses: {},
            breaches: {},
        });

        return {
            success: this.success,
            request: this.email_addresses,
            result,
        }
    }

    async complete () {
        //This function runs calls sequentially so a single failed call doesn't bring down the others
        //If it was possible to do this with promise.all that would be preferable - 3rd party promise library?
        let email_address;
        let response;
        for (let i = 0; i < this.email_addresses.length; i += 1) {
            email_address = this.email_addresses[i];
            try {
                response = await this.makeRequest(this.getURL(email_address));
                this.response_data[email_address] = response.data;
                this.success = true;
            } catch(e) {
                console.log(`Request failed ${email_address}`);
                console.log(e);
            }
        };
        
        return this.processResponse();
    };
};

module.exports = EmailCheckClient;