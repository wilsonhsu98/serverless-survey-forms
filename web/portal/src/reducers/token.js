
import * as types from '../constants/ActionTypes';

export default function token(state = '', action) {
    switch (action.type) {
    case types.SET_TOKEN:
        return action.token;
    case types.EXPIRED_TOKEN:
        return '';
    default:
        return state;
    }
}
