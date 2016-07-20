
import * as types from '../constants/ActionTypes';

export default function token(state = '', action) {
    switch (action.type) {
    case types.SET_TOKEN:
        return action.token;
    default:
        return state;
    }
}
