import expect from 'expect';
import * as actions from '../../../portal/src/actions/editPage';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] editPage action', () => {
    it('should create an action to set edit page', () => {
        const editPage = {
            description: 'I am Page 1',
            page: 1
        };
        const expectedActions = {
            type: types.SET_EDITPAGE,
            editPage
        };

        expect(
            actions.setEditPage(editPage)
        ).toEqual(expectedActions);
    });

    it('should create an action to stop edit page', () => {
        const expectedActions = {
            type: types.STOP_EDITPAGE
        };

        expect(
            actions.stopEditPage()
        ).toEqual(expectedActions);
    });
});
