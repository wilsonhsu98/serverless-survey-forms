import * as types from '../constants/ActionTypes';

export default function submit(state = {}, action) {
    switch (action.type) {
    case types.RECORD_FEEDBACK:
        return Object.assign({}, state, action.feedback);
    default:
        return state;
    }
}
