import * as types from '../constants/ActionTypes';

export default function clientID(state = '', action) {
    switch (action.type) {
    case types.SAVE_CLIENT_ID:
        return action.clientID;
    default:
        return state;
    }
}
