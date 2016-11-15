import expect from 'expect';
import questions from '../../../portal/src/reducers/questions';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] questions reducer', () => {
    const que = [ {
            page: 1,
            description: 'I am Page 1',
            question: [ {
                id: '1AN2AL0F9BNA7A',
                type: 'rating',
                label: 'Testing question text',
                data: [
                    { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Very dissatisfied' },
                    { value: '1APPJND2CYBHCD9V0FEBA', label: 'Very satisfied' }
                ],
                input: 'Tell us the reason why you choose this answe',
                required: false
            } ]
        } ];

    it('should handle questions state for default value', () => {
        expect(
            questions(undefined, { type: '' })
        ).toEqual([]);
    });

    it('should handle questions state when add question', () => {
        expect(
            questions([], {
                type: types.ADD_QUESTION,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when edit question', () => {
        expect(
            questions([], {
                type: types.EDIT_QUESTION,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when copy question', () => {
        expect(
            questions([], {
                type: types.COPY_QUESTION,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when delete question', () => {
        expect(
            questions([], {
                type: types.DELETE_QUESTION,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when exchange question', () => {
        expect(
            questions([], {
                type: types.EXCHANGE_QUESTION,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when copy page', () => {
        expect(
            questions([], {
                type: types.COPY_PAGE,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when edit page title', () => {
        expect(
            questions([], {
                type: types.EDIT_PAGE_TITLE,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when delete page', () => {
        expect(
            questions([], {
                type: types.DELETE_PAGE,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when exchange page', () => {
        expect(
            questions([], {
                type: types.EXCHANGE_PAGE,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when update questions', () => {
        expect(
            questions([], {
                type: types.UPDATE_QUESTIONS,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when receive questions', () => {
        expect(
            questions([], {
                type: types.RECEIVE_QUESTIONS_SUCCESS,
                questions: que
            })
        ).toEqual(que);
    });

    it('should handle questions state when add page', () => {
        expect(
            questions(que, {
                type: types.ADD_PAGE,
                page: {
                    page: 2,
                    description: 'I am Page 2',
                    question: [ {
                        id: '1AN2AL0F9BGGWW4',
                        type: 'checkbox',
                        label: 'Testing question text 2',
                        data: [
                            { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Very dissatisfied' },
                            { value: '1APPJND2CYBHCD9V0FEBA', label: 'Very satisfied' }
                        ],
                        required: false
                    } ]
                }
            })
        ).toEqual([
            {
                page: 1,
                description: 'I am Page 1',
                question: [ {
                    id: '1AN2AL0F9BNA7A',
                    type: 'rating',
                    label: 'Testing question text',
                    data: [
                        { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Very dissatisfied' },
                        { value: '1APPJND2CYBHCD9V0FEBA', label: 'Very satisfied' }
                    ],
                    input: 'Tell us the reason why you choose this answe',
                    required: false
                } ]
            }, {
                page: 2,
                description: 'I am Page 2',
                question: [ {
                    id: '1AN2AL0F9BGGWW4',
                    type: 'checkbox',
                    label: 'Testing question text 2',
                    data: [
                        { value: '1APPJND2CYA3FQEBJ3K7O', label: 'Very dissatisfied' },
                        { value: '1APPJND2CYBHCD9V0FEBA', label: 'Very satisfied' }
                    ],
                    required: false
                } ]
            }
        ]);
    });

    it('should handle questions state when init questions', () => {
        expect(
            questions([], {
                type: types.INIT_QUESTIONS
            })
        ).toEqual([]);
    });
});
