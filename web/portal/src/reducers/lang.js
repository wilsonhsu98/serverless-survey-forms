
import * as types from '../constants/ActionTypes';

export default function lang(state = 'en-US', action) {
    switch (action.type) {
    case types.SET_SUBJECT:
        return action.lang;
    default:
        return state;
    }
}
