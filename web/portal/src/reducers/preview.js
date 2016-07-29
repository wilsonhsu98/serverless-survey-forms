
import * as types from '../constants/ActionTypes';

export default function preview(state = '', action) {
    switch (action.type) {
    case types.SET_PREVIEW:
        return action.preview;
    case types.STOP_PREVIEW:
        return '';
    default:
        return state;
    }
}
