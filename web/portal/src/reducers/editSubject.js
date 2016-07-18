
import * as types from '../constants/ActionTypes';

export default function editSubject(state = false, action) {
    switch (action.type) {
    case types.EDIT_SUBJECT:
        return action.editSubject;
    default:
        return state;
    }
}
