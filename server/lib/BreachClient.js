const ApiClient = require('./ApiClient');

class BreachClient extends ApiClient {
    constructor (breach_name) {
        super('https://haveibeenpwned.com/api/v2/breach/');

        this.breach_name = breach_name;
    }

    getURL () {
        return `${super.getURL()}${this.breach_name}`;
    }
};

module.exports = BreachClient;