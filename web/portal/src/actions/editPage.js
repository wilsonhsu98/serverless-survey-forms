
import * as types from '../constants/ActionTypes';

export function setEditPage(id) {
    return {
        type: types.SET_EDITPAGE,
        editPage: id
    };
}

export function stopEditPage() {
    return {
        type: types.STOP_EDITPAGE
    };
}
