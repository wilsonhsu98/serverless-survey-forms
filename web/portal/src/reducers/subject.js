
import * as types from '../constants/ActionTypes';

export default function subject(state = '', action) {
    switch (action.type) {
    case types.SET_SUBJECT:
        return action.subject;
    default:
        return state;
    }
}
