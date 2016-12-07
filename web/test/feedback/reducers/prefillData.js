import expect from 'expect';
import prefillData from '../../../src/reducers/prefillData';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] prefillData reducer', () => {
    it('should handle prefillData state for default value', () => {
        expect(
            prefillData(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle prefillData state', () => {
        const data = {
            email: "xxxx@domain.com"
        };
        expect(
            prefillData({}, {
                type: types.SAVE_PREFILL_DATA,
                data
            })
        ).toEqual(data);
    });
});
