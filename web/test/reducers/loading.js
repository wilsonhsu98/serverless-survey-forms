import expect from 'expect';
import loading from '../../src/reducers/loading';
import * as types from '../../src/constants/ActionTypes';

describe('loading reducer', () => {
    it('should handle loading state when request survey', () => {
        expect(
            loading(false, {
                type: types.REQUEST_SURVEY
            })
        ).toEqual(true);
    });

    it('should handle loading state when request survey success', () => {
        expect(
            loading(true, {
                type: types.RECEIVE_SURVEY_SUCCESS
            })
        ).toEqual(false);
    });

    it('should handle loading state when receive survey failure', () => {
        expect(
            loading(true, {
                type: types.RECEIVE_SURVEY_FAILURE
            })
        ).toEqual(false);
    });
});
