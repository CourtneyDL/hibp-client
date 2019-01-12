/* global describe, it */
import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import HelloWorld from '../../../../ui/source/js/components/Basic/HelloWorld';

describe('ui/components/Basic/HelloWorld', function () {
    it('should be in its base state', function () {
        const wrapper = shallow(<HelloWorld/>);

        expect(wrapper.is('h2.header')).to.equal(true, 'h2.header missing');
        expect(wrapper.text()).to.equal('Hello World!', `doesn't say hello world`);
    });
});