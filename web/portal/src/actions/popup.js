
import * as types from '../constants/ActionTypes';

export function setPopup(data) {
    return {
        type: types.SET_POPUP,
        popup: data
    };
}

export function closePopup() {
    return {
        type: types.CLOSE_POPUP
    };
}
