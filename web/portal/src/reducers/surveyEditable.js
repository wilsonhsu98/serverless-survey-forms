
import * as types from '../constants/ActionTypes';

export default function surveyEditable(state = true, action) {
    switch (action.type) {
    case types.SET_NOT_EDITABLE:
        return false;
    case types.SET_EDITABLE:
        return true;
    default:
        return state;
    }
}
