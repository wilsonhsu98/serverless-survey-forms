import expect from 'expect';
import * as actions from '../../../portal/src/actions/editSubject';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] editSubject action', () => {
    it('should create an action to open subject editor', () => {
        const expectedActions = {
            type: types.EDIT_SUBJECT,
            editSubject: true
        };

        expect(
            actions.openEdit(true)
        ).toEqual(expectedActions);
    });

    it('should create an action to close subject editor', () => {
        const expectedActions = {
            type: types.EDIT_SUBJECT,
            editSubject: false
        };

        expect(
            actions.openEdit(false)
        ).toEqual(expectedActions);
    });
});
