
import * as types from '../constants/ActionTypes';

export default function editPage(state = 0, action) {
    switch (action.type) {
    case types.SET_EDITPAGE:
        return action.editPage;
    case types.STOP_EDITPAGE:
        return 0;
    default:
        return state;
    }
}
