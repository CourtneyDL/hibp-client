import {expect} from 'chai';
import axios from 'axios';
import sinon from 'sinon';

import EmailCheckClient from '../../../server/lib/EmailCheckClient';
import test_data from './EmailCheckClient.data';

describe('server/lib/EmailCheckClient', function () {
    let sandbox;
    beforeEach(() => sandbox = sinon.createSandbox());
    afterEach(() => sandbox.restore());

    const email_addresses = ['courtney@gmail.com','courtneypeacock@gmail.com'];
    const email_address = email_addresses[0];

    it('should generate URL', function () {
        const api_client = new EmailCheckClient([email_address]);
        const api_url = api_client.getURL(email_address);
        expect(api_url).to.equal(`https://haveibeenpwned.com/api/v2/breachedaccount/${email_address}`);
    });
    
    it('should complete for a single email address', async function () {
        const resolved = new Promise((r) => r({ data: test_data.responses[email_address] }));
        const stub = sandbox.stub(axios, 'get')
        
        stub.withArgs(`https://haveibeenpwned.com/api/v2/breachedaccount/${email_address}`)
            .returns(resolved);
        stub.returns({ data: [] });

        const api_client = new EmailCheckClient([email_address]);
        const result = await api_client.complete();
        
        expect(result).to.be.an('object', 'result is not an object');
        expect(result.success).to.equal(true, 'result success is false');
        expect(result.request).to.eql([email_address], 'request data does not match between request and result');
        expect(result.result.email_addresses).to.eql({
            [email_address]: test_data.results[email_address],
        }, 'email address results are incorrect');
        expect(result.result.breaches).to.eql(test_data.single_breaches, 'breach object is incorrect');
    });
    
    it('should complete for a multiple email addresses', async function () {
        const stub = sandbox.stub(axios, 'get')
        
        email_addresses.forEach(email_address => 
            stub.withArgs(`https://haveibeenpwned.com/api/v2/breachedaccount/${email_address}`)
                .returns(new Promise((r) => r({ data: test_data.responses[email_address] })))
        );
        stub.returns({ data: [] });

        const api_client = new EmailCheckClient(email_addresses);
        const result = await api_client.complete();
        
        expect(result).to.be.an('object', 'result is not an object');
        expect(result.success).to.equal(true, 'result success is false');
        expect(result.request).to.eql(email_addresses, 'request data does not match between request and result');
        expect(result.result.email_addresses).to.eql({
            [email_addresses[0]]: test_data.results[email_addresses[0]],
            [email_addresses[1]]: test_data.results[email_addresses[1]],
        }, 'email address results are incorrect');
        expect(result.result.breaches).to.eql(test_data.multi_breaches, 'breach object is incorrect');
    });
});