
import * as types from '../constants/ActionTypes';

export default function fbID(state = '', action) {
    switch (action.type) {
    case types.SET_FBID:
    case types.RECIEVE_FBID_SUCCESS:
        return action.fbID;
    case types.RECIEVE_FBID_FAILURE:
        return '';
    default:
        return state;
    }
}
