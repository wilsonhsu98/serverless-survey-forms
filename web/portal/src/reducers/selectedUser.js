
import * as types from '../constants/ActionTypes';

export default function selectedUser(state = {}, action) {
    switch (action.type) {
    case types.SET_SELECTED_USER:
        return action.selectedUser;
    default:
        return state;
    }
}
