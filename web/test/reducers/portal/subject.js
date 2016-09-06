import expect from 'expect';
import subject from '../../../portal/src/reducers/subject';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] subject reducer', () => {
    it('should handle subject state', () => {
        expect(
            subject('', {
                type: types.SET_SUBJECT,
                subject: 'Date Survey'
            })
        ).toEqual('Date Survey');
    });
});
