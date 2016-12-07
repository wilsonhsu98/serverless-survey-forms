import expect from 'expect';
import pageDone from '../../../src/reducers/pageDone';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] pageDone reducer', () => {
    it('should handle pageDone state for default value', () => {
        expect(
            pageDone(undefined, { type: '' })
        ).toEqual('init');
    });

    it('should handle pageDone state', () => {
        expect(
            pageDone('init', {
                type: types.SET_PAGE_DONE,
                done: true
            })
        ).toEqual(true);
    });
});
