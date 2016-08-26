import * as types from '../constants/ActionTypes';

export default function pageDone(state = 'init', action) {
    switch (action.type) {
    case types.SET_PAGE_DONE:
        return action.done;
    default:
        return state;
    }
}
