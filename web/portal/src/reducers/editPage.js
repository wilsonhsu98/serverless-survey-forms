
import * as types from '../constants/ActionTypes';

export default function editPage(state = {}, action) {
    switch (action.type) {
    case types.SET_EDITPAGE:
        return Object.assign({}, state, action.editPage);
    case types.STOP_EDITPAGE:
        return {};
    default:
        return state;
    }
}
