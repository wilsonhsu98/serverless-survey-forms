import expect from 'expect';
import survey from '../../../src/reducers/survey';
import * as types from '../../../src/constants/ActionTypes';

describe('[Feedback] survey reducer', () => {
    it('should handle survey state for default value', () => {
        expect(
            survey(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle survey state', () => {
        const data = {
            content: [
                {
                    page: 1,
                    description: 'I am Page 1',
                    question: [{
                        id: '1AN2AL0F9BNA7A',
                        order: 1,
                        type: 'rating',
                        label: 'Testing question text',
                        data: [
                            { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Dissatisfied' },
                            { value: '1APPJND2CYBHCD9V0FEBA', label: 'Satisfied' }
                        ],
                        input: 'Tell us the reason why you choose this answer',
                        required: false
                    }]
                }
            ],
            thankyou: {
                privacy: {}
            },
            format: 'v1'
        };

        expect(
            survey({}, {
                type: types.RECEIVE_SURVEY_SUCCESS,
                survey: data
            })
        ).toEqual(data);
    });
});
