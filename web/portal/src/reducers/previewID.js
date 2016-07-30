
import * as types from '../constants/ActionTypes';

export default function previewID(state = '', action) {
    switch (action.type) {
    case types.SET_PREVIEW:
        return action.previewID;
    case types.STOP_PREVIEW:
        return '';
    default:
        return state;
    }
}
