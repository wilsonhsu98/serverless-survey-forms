import expect from 'expect';
import editSubject from '../../../portal/src/reducers/editSubject';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] editSubject reducer', () => {
    it('should handle editSubject state', () => {
        expect(
            editSubject(false, {
                type: types.EDIT_SUBJECT,
                editSubject: true
            })
        ).toEqual(true);
    });
});
