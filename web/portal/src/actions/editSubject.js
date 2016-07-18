
import * as types from '../constants/ActionTypes';

export function openEdit(flag) {
    return {
        type: types.EDIT_SUBJECT,
        editSubject: flag
    };
}
