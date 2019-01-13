import {expect} from 'chai';
import axios from 'axios';
import sinon from 'sinon';

import BreachClient from '../../../server/lib/BreachClient';
import test_data from './BreachClient.data';

describe('server/lib/BreachClient', function () {
    let sandbox;
    beforeEach(() => sandbox = sinon.createSandbox());
    afterEach(() => sandbox.restore());

    const breach_name = 'Disqus';
    const api_client = new BreachClient(breach_name);
        
    //This is test is pointless if hash generation is not consistent
    it('should generate URL', function () {
        const api_url = api_client.getURL();
        expect(api_url).to.equal(`https://haveibeenpwned.com/api/v2/breach/${breach_name}`);
    });
    
    it('should complete', async function () {
        const resolved = new Promise((r) => r({ data: test_data }));
        sandbox.stub(axios, 'get').returns(resolved);

        const result = await api_client.complete();
        expect(result).to.eql(test_data);
    });
});