
import * as types from '../constants/ActionTypes';

export function setEditPage(page_id) {
    return {
        type: types.SET_EDITPAGE,
        editPage: page_id
    };
}

export function stopEditPage() {
    return {
        type: types.STOP_EDITPAGE
    };
}
