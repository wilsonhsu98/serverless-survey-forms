import expect from 'expect';
import requiredData from '../../../src/reducers/requiredData';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] requiredData reducer', () => {
    it('should handle requiredData state for default value', () => {
        expect(
            requiredData(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle requiredData state', () => {
        const data = [{
            done: true,
            id: "1B2NAJM077LSHAIE6RY4Z",
            order: 1,
            required: true
        }];
        expect(
            requiredData({}, {
                type: types.SET_REQUIRED_DATA,
                requiredData: data
            })
        ).toEqual(data);
    });
});
