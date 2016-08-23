import * as types from '../constants/ActionTypes';

export default function feedback(state = {}, action) {
    switch (action.type) {
    case types.SET_FEEDBACK_FORMAT:
        return Object.assign({}, state, action.feedback);
    default:
        return state;
    }
}
