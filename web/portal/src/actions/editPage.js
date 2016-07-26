
import * as types from '../constants/ActionTypes';

export function setEditPage(data) {
    return {
        type: types.SET_EDITPAGE,
        editPage: data
    };
}

export function stopEditPage() {
    return {
        type: types.STOP_EDITPAGE
    };
}
