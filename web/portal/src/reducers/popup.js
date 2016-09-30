
import * as types from '../constants/ActionTypes';

export default function popup(state = '', action) {
    switch (action.type) {
    case types.SET_POPUP:
        return action.popup;
    case types.CLOSE_POPUP:
        return '';
    default:
        return state;
    }
}
