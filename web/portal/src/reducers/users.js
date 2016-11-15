
import * as types from '../constants/ActionTypes';

export default function users(state = [], action) {
    switch (action.type) {
    case types.RECEIVE_USERS_SUCCESS:
    case types.RECEIVE_CHANGE_ROLE_SUCCESS:
        return [...action.users];
    default:
        return state;
    }
}
