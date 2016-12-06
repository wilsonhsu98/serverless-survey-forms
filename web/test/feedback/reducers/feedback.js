import expect from 'expect';
import feedback from '../../../src/reducers/feedback';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] feedback reducer', () => {
    it('should handle feedback state for default value', () => {
        expect(
            feedback(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle feedback state', () => {
        const data = {
            Q1: {
                data: [
                    { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Dissatisfied' },
                    { value: '1APPJND2CYBHCD9V0FEBA', label: 'Satisfied' }
                ],
                required: false
            }
        };
        expect(
            feedback({}, {
                type: types.SET_FEEDBACK_FORMAT,
                feedback: data
            })
        ).toEqual(data);
    });
});
