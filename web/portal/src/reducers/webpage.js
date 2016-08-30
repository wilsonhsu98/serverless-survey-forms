
import * as types from '../constants/ActionTypes';

export default function webpage(state = 'index', action) {
    switch (action.type) {
    case types.SET_WEBPAGE:
        return action.webpage;
    default:
        return state;
    }
}
