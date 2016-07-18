
import * as types from '../constants/ActionTypes';

import { push } from 'react-router-redux';
import { openEdit } from './editSubject';

function setSubject(data) {
    return {
        type: types.SET_SUBJECT,
        subject: data
    };
}

export function saveSubject(data) {
    return (dispatch) => {
        dispatch(setSubject(data));
        dispatch(push('/create'));
        dispatch(openEdit(false));
    };
}
