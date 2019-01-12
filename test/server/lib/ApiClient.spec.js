import {expect} from 'chai';

import ApiClient from '../../../server/lib/ApiClient';

describe('server/lib/ApiClient', function () {
    const api_client = new ApiClient();
    const result = api_client.complete();
    
    it('should complete', function () {
        expect(result).to.be.an('array');
    });
});