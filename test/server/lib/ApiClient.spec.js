import {expect} from 'chai';
import axios from 'axios';
import sinon from 'sinon';

import ApiClient from '../../../server/lib/ApiClient';

describe('server/lib/ApiClient', function () {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    const api_client = new ApiClient();
    
    it('should generate URL', function () {
        const api_url = api_client.getURL();
        expect(api_url).to.equal('');
    });
    
    it('should process response', function () {
        const response = { data: [] };
        const processed_response = api_client.processResponse(response);
        expect(processed_response).to.be.an('array');
        expect(processed_response).to.have.length(0);
    });

    it('should complete', async function () {
        const resolved = new Promise((r) => r({ data: [] }));
        sandbox.stub(axios, 'get').returns(resolved);

        const result = await api_client.complete();
        expect(result).to.be.an('array');
        expect(result).to.have.length(0);
    });
});