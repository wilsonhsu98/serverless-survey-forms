
import * as types from '../constants/ActionTypes';

export function setEditPage(flag) {
    return {
        type: types.SET_EDITPAGE,
        editPage: flag
    };
}
