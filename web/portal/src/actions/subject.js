
import * as types from '../constants/ActionTypes';

import { push } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
import Config from '../config';
import { openEdit } from './editSubject';
import { setSuveyID } from './surveyID';

function setSubject(data) {
    return {
        type: types.SET_SUBJECT,
        subject: data
    };
}

export function saveSubject(data, account_id, token) {
    const postData = {
        subject: data,
        survey: []
    };

    return (dispatch) => {
        fetch(`${Config.baseURL}/mgnt/surveys/${account_id}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                // Authenticated: token
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setSubject(data));
            dispatch(setSuveyID(data.surveyid));
            dispatch(push('/create'));
            dispatch(openEdit(false));
        })
        .catch(err => {

        });
    };
}
