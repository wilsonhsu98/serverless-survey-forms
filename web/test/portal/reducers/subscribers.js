import expect from 'expect';
import subscribers from '../../../portal/src/reducers/subscribers';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] subscribers reducer', () => {
    it('should handle subscribers state for default value', () => {
        expect(
            subscribers(undefined, { type: '' })
        ).toEqual([]);
    });

    it('should handle subscribers state', () => {
        const list = ["aaa@aaa.com", "bbb@bb.com"];
        expect(
            subscribers([], {
                type: types.RECEIVE_SUBSCRIBERS_SUCCESS,
                subscribers: list
            })
        ).toEqual(list);

        expect(
            subscribers([], {
                type: types.ADD_SUBSCRIBERS_SUCCESS,
                subscribers: list
            })
        ).toEqual(list);

        expect(
            subscribers([], {
                type: types.DELETE_SUBSCRIBERS_SUCCESS,
                subscribers: list
            })
        ).toEqual(list);
    });
});
