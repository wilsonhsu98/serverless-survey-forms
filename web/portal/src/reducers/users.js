
import * as types from '../constants/ActionTypes';

export default function users(state = [], action) {
    switch (action.type) {
    case types.RECIEVE_USERS_SUCCESS:
        return [...action.users];
    default:
        return state;
    }
}
