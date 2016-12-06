import expect from 'expect';
import paging from '../../../src/reducers/paging';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] paging reducer', () => {
    it('should handle paging state for default value', () => {
        expect(
            paging(undefined, { type: '' })
        ).toEqual(1);
    });

    it('should handle paging state', () => {
        expect(
            paging(1, {
                type: types.GO_TO_PAGE,
                index: 2
            })
        ).toEqual(2);
    });
});
