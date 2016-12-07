import expect from 'expect';
import submit from '../../../src/reducers/submit';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] submit reducer', () => {
    it('should handle submit state for default value', () => {
        expect(
            submit(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle submit state', () => {
        const data = {
            Q1: {
                data: [
                    { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Dissatisfied' },
                    { value: '1APPJND2CYBHCD9V0FEBA', label: 'Satisfied' }
                ],
                label: "1B2NAJM077LSHAIE6RY4Z",
                type:"checkbox"
            }
        };
        expect(
            submit({}, {
                type: types.RECORD_FEEDBACK,
                feedback: data
            })
        ).toEqual(data);
    });
});
