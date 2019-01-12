/* global describe, it */
import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import Counter from '../../../../ui/source/js/components/Basic/Counter';

describe('ui/components/Basic/Counter', function () {
    it('should be in its base state', function () {
        const wrapper = shallow(<Counter/>);
        const counter_text = wrapper.find('.counter__text');

        expect(wrapper.hasClass('container')).to.equal(true, 'container class missing');
        expect(wrapper.hasClass('counter')).to.equal(true, 'counter class missing');
        
        expect(counter_text.hasClass('counter__text')).to.equal(true, 'element class missing');
        expect(counter_text.text()).to.equal('0 Clicks', 'Count incorrect');
        expect(counter_text.hasClass('counter__text--failed')).to.equal(false, 'Failure class present');
    });
    it('should have 1 click', function () {
        const wrapper = shallow(<Counter count={1} />);
        const counter_text = wrapper.find('.counter__text');

        expect(counter_text.text()).to.equal('1 Click', 'Count incorrect');
        expect(counter_text.hasClass('counter__text--failed')).to.equal(false, 'Failure class present');
    });
    it('should have 2 clicks', function () {
        const wrapper = shallow(<Counter count={2} />);
        const counter_text = wrapper.find('.counter__text');

        expect(counter_text.text()).to.equal('2 Clicks', 'Count incorrect');
        expect(counter_text.hasClass('counter__text--failed')).to.equal(false, 'Failure class present');
    });
    it('should have be in a failed state', function () {
        const wrapper = shallow(<Counter count={2} failed={true} />);
        const counter_text = wrapper.find('.counter__text');

        expect(counter_text.text()).to.equal('2 Clicks', 'Count incorrect');
        expect(counter_text.hasClass('counter__text--failed')).to.equal(true, 'Failure class missing');
    });
});