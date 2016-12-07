import expect from 'expect';
import loading from '../../../src/reducers/loading';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] loading reducer', () => {
    it('should handle loading state for default value', () => {
        expect(
            loading(undefined, { type: '' })
        ).toEqual(true);
    });

    it('should handle loading state when request survey', () => {
        expect(
            loading(false, {
                type: types.REQUEST_SURVEY
            })
        ).toEqual(true);
    });

    it('should handle loading state when receive survey', () => {
        expect(
            loading(true, {
                type: types.RECEIVE_SURVEY_SUCCESS
            })
        ).toEqual(false);

        expect(
            loading(true, {
                type: types.RECEIVE_SURVEY_FAILURE
            })
        ).toEqual(false);
    });
});
