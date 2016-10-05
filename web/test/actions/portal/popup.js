import expect from 'expect';
import * as actions from '../../../portal/src/actions/popup';
import * as types from '../../../portal/src/constants/ActionTypes';

describe('[Portal] popup action', () => {
    it('should create an action to set popup', () => {
        expect(
            actions.setPopup('deleteOneSurvey')
        ).toEqual({
            type: types.SET_POPUP,
            popup: 'deleteOneSurvey'
        });

        expect(
            actions.closePopup()
        ).toEqual({
            type: types.CLOSE_POPUP
        });
    });
});
