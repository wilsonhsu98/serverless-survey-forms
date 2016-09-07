import expect from 'expect';
import dropQuestion from '../../../portal/src/reducers/dropQuestion';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] dropQuestion reducer', () => {
    it('should handle dropQuestion state', () => {
        expect(
            dropQuestion({}, {
                type: types.SET_DROP_QUESTION,
                dropQuestion: {
                    index: 1,
                    page: 1
                }
            })
        ).toEqual({
            index: 1,
            page: 1
        });
    });

    it('should handle dropQuestion state when stop drag', () => {
        expect(
            dropQuestion({}, {
                type: types.STOP_DROP_QUESTION
            })
        ).toEqual({});
    });
});
