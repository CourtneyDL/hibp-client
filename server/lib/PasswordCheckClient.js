const crypto = require('crypto');
const ApiClient = require('./ApiClient');

class PasswordCheckClient extends ApiClient {
    constructor (password) {
        super('https://api.pwnedpasswords.com/range/');

        this.password = password;
        this.hashPassword();
    }

    hashPassword () {
        const shasum = crypto.createHash('sha1');
        shasum.update(this.password);
        this.password_hash = shasum.digest('hex').toUpperCase();
    }

    getURL () {
        return `${super.getURL()}${this.password_hash.substr(0,5)}`;
    }

    processResponse ({ data }) {
        let success = false;
        let result = 0;

        if (typeof data === 'string') {
            const password_suffix = this.password_hash.substr(5);
            const data_lines = data.split('\n');
            const matching_line = data_lines.find(line => {
                const line_suffix = line.split(':')[0];
                return line_suffix === password_suffix;
            });
            if (matching_line) {
                success = true;
                result = parseInt(matching_line.split(':')[1],10);
            }
        }

        return {
            success,
            request: this.password,
            result,
        };
    }
};

module.exports = PasswordCheckClient;