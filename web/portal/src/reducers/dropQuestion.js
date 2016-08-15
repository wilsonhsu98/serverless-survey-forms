
import * as types from '../constants/ActionTypes';

export default function dropQuestion(state = {}, action) {
    switch (action.type) {
    case types.SET_DROP_QUESTION:
        return Object.assign({}, state, action.dropQuestion);
    case types.STOP_DROP_QUESTION:
        return {};
    default:
        return state;
    }
}
