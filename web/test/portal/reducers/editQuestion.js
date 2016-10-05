import expect from 'expect';
import editQuestion from '../../../portal/src/reducers/editQuestion';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] editQuestion reducer', () => {
    it('should handle editQuestion state for default value', () => {
        expect(
            editQuestion(undefined, { type: '' })
        ).toEqual({});
    });

    it('should handle editQuestion state', () => {
        expect(
            editQuestion({
                    id: '1AN2AL0F9BNA7A',
                    type: 'rating',
                    label: 'Testing question text'
                }, {
                type: types.SET_EDITQUESTION,
                editQuestion: {
                    label: 'Updated title',
                    data: [
                        { value: 1, label: 'Very dissatisfied' },
                        { value: 2, label: 'Very satisfied' }
                    ],
                    input: 'Tell us the reason why you choose this answe',
                    required: false
                }
            })
        ).toEqual({
            id: '1AN2AL0F9BNA7A',
            type: 'rating',
            label: 'Updated title',
            data: [
                { value: 1, label: 'Very dissatisfied' },
                { value: 2, label: 'Very satisfied' }
            ],
            input: 'Tell us the reason why you choose this answe',
            required: false
        });
    });

    it('should handle editQuestion state when stop edit', () => {
        expect(
            editQuestion({}, {
                type: types.STOP_EDITQUESTION
            })
        ).toEqual({});
    });

    it('should handle editQuestion state when update', () => {
        expect(
            editQuestion({}, {
                type: types.UPDATE_EDITQUESTION,
                editQuestion: {
                    id: '1AN2AL0F9BNA7A',
                    type: 'rating',
                    label: 'Testing question text',
                    data: [
                        { value: 1, label: 'Very dissatisfied' },
                        { value: 2, label: 'Very satisfied' }
                    ],
                    input: 'Tell us the reason why you choose this answe',
                    required: false
                }
            })
        ).toEqual({
            id: '1AN2AL0F9BNA7A',
            type: 'rating',
            label: 'Testing question text',
            data: [
                { value: 1, label: 'Very dissatisfied' },
                { value: 2, label: 'Very satisfied' }
            ],
            input: 'Tell us the reason why you choose this answe',
            required: false
        });
    });
});
