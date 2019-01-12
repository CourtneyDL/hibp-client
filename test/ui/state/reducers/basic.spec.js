import {expect} from 'chai';

import basic_reducer, { initial_state } from '../../../../ui/source/js/state/reducers/basic';

describe('ui/state/reducers/basic', function () {
    describe('BASIC_START', function () {
        it('state should match first load', function () {
            const action = {
                type: "BASIC_START",
            };

            const actual_state = basic_reducer(initial_state, action);
            expect(actual_state.loading).to.equal(true, 'loading is false');
            expect(actual_state.failed).to.equal(false, 'failed is true');
            expect(actual_state.count).to.equal(0, 'count is not 0');
        });
        it('state should not be failed after previous failure', function () {
            const action = {
                type: "BASIC_START",
            };
            const failed_state = {
                ...initial_state,
                failed: true,
            };

            const actual_state = basic_reducer(failed_state, action);
            expect(actual_state.loading).to.equal(true, 'loading is false');
            expect(actual_state.failed).to.equal(false, 'failed is true');
        });
    });

    describe('BASIC_COMPLETE', function () {
        it('state should increment count and not be loading or failed', function () {
            const action = {
                type: "BASIC_COMPLETE",
            };

            const actual_state = basic_reducer(initial_state, action);
            expect(actual_state.loading).to.equal(false, 'loading is true');
            expect(actual_state.failed).to.equal(false, 'failed is true');
            expect(actual_state.count).to.equal(1, 'count has not been incremented');
        });
        it('state should increment count and not be loading or failed after a previous failure', function () {
            const action = {
                type: "BASIC_COMPLETE",
            };
            const failed_state = {
                ...initial_state,
                failed: true,
                count: 2,
            };

            const actual_state = basic_reducer(failed_state, action);
            expect(actual_state.loading).to.equal(false, 'loading is true');
            expect(actual_state.failed).to.equal(false, 'failed is true');
            expect(actual_state.count).to.equal(3, 'count has not been incremented');
        });
    });

    describe('BASIC_FAIL', function () {
        it('state should be failed', function () {
            const action = {
                type: "BASIC_FAIL",
            };

            const actual_state = basic_reducer(initial_state, action);
            expect(actual_state.loading).to.equal(false, 'loading is true');
            expect(actual_state.failed).to.equal(true, 'failed is false');
            expect(actual_state.count).to.equal(0, 'count is not 0');
        });
        it('state should be failed but count should equal previous value', function () {
            const action = {
                type: "BASIC_FAIL",
            };
            const prev_state = {
                ...initial_state,
                count: 2,
            };

            const actual_state = basic_reducer(prev_state, action);
            expect(actual_state.loading).to.equal(false, 'loading is true');
            expect(actual_state.failed).to.equal(true, 'failed is false');
            expect(actual_state.count).to.equal(2, 'count does equal previous value');
        });
    });
});