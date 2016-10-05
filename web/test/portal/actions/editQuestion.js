import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import expect from 'expect';
import * as actions from '../../../portal/src/actions/editQuestion';
import * as types from '../../../portal/src/constants/ActionTypes';

const mockStore = configureStore([thunkMiddleware]);

describe('[Portal] editQuestion action', () => {
    it('should create an action to set edit question', () => {
        const editQuestion = {
            label: 'Updated title',
            data: [
                { value: 1, label: 'Dissatisfied' },
                { value: 2, label: 'Satisfied' }
            ],
            input: 'Tell us the reason why you choose this answer',
            required: false
        };
        const expectedActions = {
            type: types.SET_EDITQUESTION,
            editQuestion
        };

        expect(
            actions.setEditQuestion(editQuestion)
        ).toEqual(expectedActions);
    });

    it('should create an action to stop edit question', () => {
        const expectedActions = {
            type: types.STOP_EDITQUESTION
        };

        expect(
            actions.stopEditQuestion()
        ).toEqual(expectedActions);
    });

    it('should create an action to delete edit question\'s input', () => {
        const editQuestion = {
            label: 'Updated title',
            data: [
                { value: 1, label: 'Dissatisfied' },
                { value: 2, label: 'Satisfied' }
            ],
            required: false
        };
        const store = mockStore({ editQuestion });
        const expectedActions = [{
            type: types.UPDATE_EDITQUESTION,
            editQuestion
        }];

        store.dispatch(actions.deleteRatingInput());
        expect(
            store.getActions()
        ).toEqual(expectedActions);
    });
});
