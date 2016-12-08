import expect from 'expect';
import done from '../../../src/reducers/done';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] done reducer', () => {
    it('should handle done state for default value', () => {
        expect(
            done(undefined, { type: '' })
        ).toEqual(false);
    });

    it('should handle done state', () => {
        expect(
            done('', { type: types.SURVEY_DONE })
        ).toEqual(true);
    });
});
