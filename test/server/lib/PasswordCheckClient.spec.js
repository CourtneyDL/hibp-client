import {expect} from 'chai';
import axios from 'axios';
import sinon from 'sinon';

import PasswordCheckClient from '../../../server/lib/PasswordCheckClient';
import test_data from './PasswordCheckClient.data';

describe('server/lib/PasswordCheckClient', function () {
    let sandbox;
    beforeEach(() => sandbox = sinon.createSandbox());
    afterEach(() => sandbox.restore());

    const api_client = new PasswordCheckClient('password1234');
    const expected_response = {
        success: true,
        request: 'password1234',
        result: 22154,
    };
    
    //This is test is pointless if hash generation is not consistent
    it('should generate URL', function () {
        const api_url = api_client.getURL();
        expect(api_url).to.equal('https://api.pwnedpasswords.com/range/E6B6A');
    });
    
    it('should process response', function () {
        const response = { data: test_data.range_response };
        const processed_response = api_client.processResponse(response);
        expect(processed_response).to.eql(expected_response);
    });

    it('should complete', async function () {
        const resolved = new Promise((r) => r({ data: test_data.range_response }));
        sandbox.stub(axios, 'get').returns(resolved);

        const result = await api_client.complete();
        expect(result).to.eql(expected_response);
    });
});