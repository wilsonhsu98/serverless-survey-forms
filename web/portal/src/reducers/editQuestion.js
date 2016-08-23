
import * as types from '../constants/ActionTypes';

export default function editQuestion(state = {}, action) {
    switch (action.type) {
    case types.SET_EDITQUESTION:
        return Object.assign({}, state, action.editQuestion);
    case types.STOP_EDITQUESTION:
        return {};
    case types.UPDATE_EDITQUESTION:
        return action.editQuestion;
    default:
        return state;
    }
}
