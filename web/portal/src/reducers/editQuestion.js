
import * as types from '../constants/ActionTypes';

export default function editQuestion(state = {}, action) {
    switch (action.type) {
    case types.SET_EDITQUESTION:
        return Object.assign({}, state, action.editQuestion);
    case types.STOP_EDITQUESTION:
        return {};
    case types.DELETE_RATING_INPUT:
        const newData = Object.assign({}, state);
        delete newData.input;
        return newData;
    default:
        return state;
    }
}
