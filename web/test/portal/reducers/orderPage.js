import expect from 'expect';
import orderPage from '../../../portal/src/reducers/orderPage';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] orderPage reducer', () => {
    it('should handle orderPage state for default value', () => {
        expect(
            orderPage(undefined, { type: '' })
        ).toEqual([]);
    });

    it('should handle orderPage state', () => {
        expect(
            orderPage([], {
                type: types.SET_ORDERPAGE,
                orderPage: [2, 1]
            })
        ).toEqual([2, 1]);
    });
});
