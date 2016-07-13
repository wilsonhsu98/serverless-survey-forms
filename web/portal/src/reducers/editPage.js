
import * as types from '../constants/ActionTypes';

export default function editPage(state = '', action) {
    switch (action.type) {
    case types.SET_EDITPAGE:
        return action.editPage;
    default:
        return state;
    }
}
